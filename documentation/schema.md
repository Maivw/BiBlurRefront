# BiBlur Schema

## Users

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| email          |  string   |              not null |
| username       |  string   |              not null |
| password       |  string   |              not null |
| imageUrl       |  string   |              not null |


## Posts

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  |           foreign key |
| postContent    |  string   |                       |
| location       |  string   |                       |
| imagePostUrl   |  string   |                       |
| videoPostUrl   |  string   |                       |



## Comments

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| postId         |  integer  |           foreign key |
| userId         |  integer  |           foreign key |
| commentContent |  string   |                       |

## Likes

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  |           foreign key |
| commentId      |  integer  |           foreign key |
| postId         |  integer  |           foreign key |

## Follows

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| userId         |  integer  | not null, primary key |
| following      |           |                       |
| followed       |           |                       |
