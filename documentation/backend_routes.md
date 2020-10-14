## Routes and Endpoints

1. Users routes
   * GET /users/:id - return a particular user profile information including role
   * POST /users - create a new user account
   * POST /users/login - used to create token for sustained login
   * PUT /users/:id - update a particular user's information

2. Posts routes
   * GET /posts - returns available posts including User, Like and Comment
   * GET /posts/:id - return a particular post
   * POST /posts - user makes a post
   * PUT /posts/:id - user's ability to update their own post
   * DELETE /posts/:id - user could delete a particular post

3. Comments
   * GET /comments/:postId/:commentId - to get a comment on a post
   * POST /comments/:postId - to create a new comment on a certain post
   * DELETE /comments/:postId/:commentId - to delete a comment
   * PUT /comments/:postId/:commentId - to update a comment

4. Likes
   * DELETE /likes/:postId/:commentId - user can unlike a comment on a post
   * DELETE /likes/:postId - user unlikes a post
   * POST /likes/:postId/:commentId - user can like a comment on a post
   * POST /likes/:postId - user likes a post
