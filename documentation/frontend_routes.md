
### FrontEnd Routes


1. Home Page `/` display all posts of all shelters
2. Login `/login` => redirect to profile page of adopter or shelter
3. Register `/signup` => post request => redirect to `/` 
___
4. Preferred Pet Attributes `/preferredPet` => post request => adopter inputs qualities they'd like to match with potential pets
5. Adopter profile `/adopter/:id` => show adoper profile including personal info, adoptions request and find an ideal pet link
6. Liked Pets `/lovepets` => show pets that adopters liked
___
7. Shelter profile `/shelter:id` => show shelter profiles including personal info, their own pets and adoptions requests sent by adopters.
8. Edit a pet `/pets/edit/:id` => put request => edit a particular pets information
9. Pet information `/pets/:id` => display a particular pet's information
---
10. Get list pets of a shelter `pets/edit/shelters/:id`
11. Shelter add a new pet to their pet list `/pets/new`
12. Logout `/logout` => redirect to the login form
