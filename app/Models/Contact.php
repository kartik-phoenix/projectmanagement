<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;
use Lab404\Impersonate\Models\Impersonate;

/**
 * Class Contact
 *
 * @version April 10, 2020, 6:43 am UTC
 *
 * @property int $id
 * @property string|null $position
 * @property int $primary_contact
 * @property int $send_welcome_email
 * @property int $send_password_email
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static Builder|Contact newModelQuery()
 * @method static Builder|Contact newQuery()
 * @method static Builder|Contact query()
 * @method static Builder|Contact whereCreatedAt($value)
 * @method static Builder|Contact whereId($value)
 * @method static Builder|Contact whereUserId($value)
 * @method static Builder|Contact whereLastName($value)
 * @method static Builder|Contact wherePassword($value)
 * @method static Builder|Contact wherePhone($value)
 * @method static Builder|Contact wherePosition($value)
 * @method static Builder|Contact wherePrimaryContact($value)
 * @method static Builder|Contact whereSendPasswordEmail($value)
 * @method static Builder|Contact whereSendWelcomeEmail($value)
 * @method static Builder|Contact whereUpdatedAt($value)
 * @mixin Eloquent
 *
 * @property int $customer_id
 * @property-read Collection|ContactToPermission[] $contactPermissions
 * @property-read int|null $contact_permissions_count
 * @property-read Collection|EmailNotification[] $emailNotifications
 * @property-read int|null $email_notifications_count
 * @property-read string $full_name
 * @property-read User $user
 *
 * @method static Builder|Contact whereCustomerId($value)
 *
 * @property int|null $user_id
 * @property-read Customer $customer
 */
class Contact extends Model
{
    use Impersonate;

    const STATUS = [
        1 => 'Active',
        0 => 'Deactive',
    ];

    const TYPE = 'Contacts';

    /**
     * @var string
     */
    protected $table = 'contacts';

    /**
     * @var string[]
     */
    protected $appends = ['permission_count'];

    /**
     * @var string[]
     */
    protected $fillable = [
        'position',
        'customer_id',
        'user_id',
        'primary_contact',
        'send_welcome_email',
        'send_password_email',
    ];

    /*
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'customer_id' => 'integer',
        'user_id' => 'integer',
        'position' => 'string',
        'primary_contact' => 'boolean',
        'send_welcome_email' => 'boolean',
        'send_password_email' => 'boolean',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'first_name' => 'required',
        'last_name' => 'nullable',
        'password' => 'required|same:password_confirmation|min:6',
        'password_confirmation' => 'required',
        'email' => 'required|unique:users,email',
        'phone' => 'nullable|unique:users,phone',
        'image' => 'max:2000',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $editRules = [
        'first_name' => 'required',
        'last_name' => 'nullable',
        'email' => 'required|unique:users,email',
        'image' => 'max:2000',
    ];

    /**
     * @var array
     */
    public static $messages = [
        'password.same' => 'The password and confirm password must match',
        'image.max' => 'Image size should not more than 2MB.',
    ];

    /**
     * @return BelongsToMany
     */
    public function emailNotifications(): BelongsToMany
    {
        return $this->belongsToMany(
            EmailNotification::class,
            'contact_email_notifications'
        )->withTimestamps();
    }

    /**
     * @return BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return belongsToMany
     */
    public function projectContacts(): BelongsToMany
    {
        return $this->belongsToMany(self::class, 'project_contacts',
            'project_id', 'contact_id')->withPivot(['contact_id']);
    }

    public function getPermissionCountAttribute()
    {
        if ($this->user) {
            return $this->user->permissions->count();
        }
    }
}
