<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Repositories\ExpenseRepository;
use Exception;
use Flash;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ExpenseController extends AppBaseController
{
    /** @var ExpenseRepository */
    private $expenseRepository;

    public function __construct(ExpenseRepository $expenseRepo)
    {
        $this->expenseRepository = $expenseRepo;
    }

    /**
     * Display a listing of the Expense.
     *
     * @return Application|Factory|View
     */
    public function index()
    {
        $expenseCategory = ExpenseCategory::orderBy('name', 'asc')->pluck('name', 'id')->toArray();

        return view('expenses.index', compact('expenseCategory'));
    }

    /**
     * Show the form for creating a new Expense.
     *
     * @param  null  $customerId
     * @return Application|Factory|View
     */
    public function create($customerId = null)
    {
        $data = $this->expenseRepository->getSyncList();

        return view('expenses.create', compact('data', 'customerId'));
    }

    /**
     * Store a newly created Expense in storage.
     *
     * @param  CreateExpenseRequest  $request
     * @return RedirectResponse|Redirector
     */
    public function store(CreateExpenseRequest $request)
    {
        $input = $request->all();
        $input['amount'] = removeCommaFromNumbers($input['amount']);
        $this->expenseRepository->create($input);

        Flash::success(__('messages.expense.expense_saved_successfully'));

        return redirect(route('expenses.index'));
    }

    /**
     * Display the specified Expense.
     *
     * @param  Expense  $expense
     * @return Application|Factory|View
     */
    public function show(Expense $expense)
    {
        $data = $this->expenseRepository->getReminderData($expense->id, Expense::class);
        $comments = $this->expenseRepository->getCommentData($expense);
        $notes = $this->expenseRepository->getNotesData($expense);
        $groupName = (request('group') == null) ? 'expense_details' : (request('group'));

        return view("expenses.views.$groupName",
            compact('expense', 'data', 'comments', 'notes', 'groupName'));
    }

    /**
     * Show the form for editing the specified Expense.
     *
     * @param  Expense  $expense
     * @return Application|Factory|View
     */
    public function edit(Expense $expense)
    {
        $data = $this->expenseRepository->getSyncList();

        return view('expenses.edit', compact('expense', 'data'));
    }

    /**
     * Update the specified Expense in storage.
     *
     * @param  Expense  $expense
     * @param  UpdateExpenseRequest  $request
     * @return RedirectResponse|Redirector
     */
    public function update(Expense $expense, UpdateExpenseRequest $request)
    {
        $input = $request->all();
        $input['amount'] = removeCommaFromNumbers($input['amount']);
        $this->expenseRepository->update($input, $expense);

        Flash::success(__('messages.expense.expense_updated_successfully'));

        return redirect(route('expenses.index'));
    }

    /**
     * Remove the specified Expense from storage.
     *
     * @param  Expense  $expense
     * @return JsonResponse
     *
     * @throws Exception
     */
    public function destroy(Expense $expense)
    {
        activity()->performedOn($expense)->causedBy(getLoggedInUser())
            ->useLog('Expense deleted.')->log($expense->name.' Expense deleted.');

        $expense->delete();

        return $this->sendSuccess('Expense deleted successfully.');
    }

    /**
     * @param  Expense  $expense
     * @return Application|ResponseFactory|Response
     *
     * @throws FileNotFoundException
     */
    public function downloadMedia(Expense $expense)
    {
        $attachmentMedia = $expense->media[0];
        $attachmentPath = $attachmentMedia->getPath();

        if (config('app.media_disc') == 'public') {
            $attachmentPath = (Str::after($attachmentMedia->getUrl(), '/uploads'));
        }

        $file = Storage::disk(config('app.media_disc'))->get($attachmentPath);

        $headers = [
            'Content-Type' => $expense->media[0]->mime_type,
            'Content-Description' => 'File Transfer',
            'Content-Disposition' => "attachment; filename={$expense->media[0]->file_name}",
            'filename' => $expense->media[0]->file_name,
        ];

        return response($file, 200, $headers);
    }

    /**
     * @param  Expense  $expense
     * @return mixed
     */
    public function getCommentsCount(Expense $expense)
    {
        return $this->sendResponse($expense->comments()->count(), 'Comments count retrieved successfully.');
    }

    /**
     * @param  Expense  $expense
     * @return mixed
     */
    public function getNotesCount(Expense $expense)
    {
        return $this->sendResponse($expense->notes()->count(), 'Comments count retrieved successfully.');
    }

    /**
     * @param  Media  $mediaItem
     * @return Media
     */
    public function download(Media $mediaItem)
    {
        return $mediaItem;
    }

    /**
     * @return Application|Factory
     */
    public function expenseCategoryByChart()
    {
        $expenseCategories = ExpenseCategory::withCount('expenses')->get();

        return view('expenses.expense_category_by_chart', compact('expenseCategories'));
    }
}
