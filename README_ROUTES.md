/**LOGIN**/

/ ----base
                get/ok


/ ---- authorization
                get/login   ok
                post/login ok
 /**SIGNUP**/   
                get/register ok
                post/register--> ok

                get/profile/:id--------> render user/my-profile
                <!-- ?        get/application/:id----> render user/pending-application-details -->
                get/admin/:id ---------> render admin/my-panel
                get/host/:id  ---------> render host/my-panel
/**PLACES ROUTES**/

/places
                get/ -------------------> render places/places-list
                get/new ----------------> render places/new-place
                post/new----------------> redirect /places
                
                get/details/:id---------> render places/details(name-description-photo(edit||delete))

                post/application/:id ---> redirect /user
                
                get/edit/:id------------> render places/edit-place
                post/edit/:id-----------> redirect /places

                post/delete/:id---------> redirect /places

                post/update/pending/:id-> redirect /profile




/**PENDING HOST**/
/**PENDING USER APPLICATION**/
/**ADMIN**/

