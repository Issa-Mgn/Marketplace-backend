# Marketplace Backend API Documentation

## Table of Contents
1. [Authentication](#authentication)
2. [Articles](#articles)
3. [Favorites](#favorites)
4. [Search](#search)
5. [Ratings](#ratings)
6. [Orders](#orders)
7. [Images](#images)

## Authentication

All API requests require identification of the user through a unique ID. This ID is generated client-side and sent in the `X-User-Id` header. If not provided, the server will generate one and return it in the `X-User-Id` response header.

## Articles

### Create Article
**POST** `/api/articles`

Create a new article for sale.

**Request Body:**
```json
{
  "name": "iPhone 12",
  "category": "Téléphones",
  "price": 799.99,
  "description": "Latest iPhone model",
  "whatsappNumber": "+1234567890",
  "additionalDetails": "64GB, Black",
  "imageUrls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
}
```

**Response:**
```json
{
  "message": "Article created successfully",
  "article": {
    "id": "uuid",
    "name": "iPhone 12",
    "category": "Téléphones",
    "price": 799.99,
    "description": "Latest iPhone model",
    "whatsapp_number": "+1234567890",
    "additional_details": "64GB, Black",
    "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "average_rating": 0.00,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

### Get Article
**GET** `/api/articles/{id}`

Get details of a specific article.

**Response:**
```json
{
  "article": {
    "id": "uuid",
    "name": "iPhone 12",
    "category": "Téléphones",
    "price": 799.99,
    "description": "Latest iPhone model",
    "whatsapp_number": "+1234567890",
    "additional_details": "64GB, Black",
    "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "average_rating": 4.50,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

### Update Article
**PUT** `/api/articles/{id}`

Update an existing article.

**Request Body:**
```json
{
  "name": "iPhone 12 Pro",
  "price": 899.99
}
```

**Response:**
```json
{
  "message": "Article updated successfully",
  "article": {
    "id": "uuid",
    "name": "iPhone 12 Pro",
    "category": "Téléphones",
    "price": 899.99,
    "description": "Latest iPhone model",
    "whatsapp_number": "+1234567890",
    "additional_details": "64GB, Black",
    "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "average_rating": 4.50,
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-01T00:00:00Z"
  }
}
```

### Delete Article
**DELETE** `/api/articles/{id}`

Delete an article.

**Response:**
```json
{
  "message": "Article deleted successfully"
}
```

### List Articles
**GET** `/api/articles`

List all articles with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search by article name

**Response:**
```json
{
  "articles": [
    {
      "id": "uuid",
      "name": "iPhone 12",
      "category": "Téléphones",
      "price": 799.99,
      "description": "Latest iPhone model",
      "whatsapp_number": "+1234567890",
      "additional_details": "64GB, Black",
      "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
      "average_rating": 4.50,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
  ]
}
```

## Favorites

### Add to Favorites
**POST** `/api/favorites/{articleId}`

Add an article to the user's favorites.

**Response:**
```json
{
  "message": "Article added to favorites",
  "favorite": {
    "id": "uuid",
    "user_id": "user-uuid",
    "article_id": "article-uuid",
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

### Remove from Favorites
**DELETE** `/api/favorites/{articleId}`

Remove an article from the user's favorites.

**Response:**
```json
{
  "message": "Article removed from favorites"
}
```

### Get User Favorites
**GET** `/api/favorites`

Get all articles in the user's favorites.

**Response:**
```json
{
  "articles": [
    {
      "id": "article-uuid",
      "name": "iPhone 12",
      "price": 799.99,
      "image_urls": ["https://example.com/image1.jpg"]
    }
  ]
}
```

### Check if Favorite
**GET** `/api/favorites/{articleId}`

Check if an article is in the user's favorites.

**Response:**
```json
{
  "isFavorite": true
}
```

### Remove All Favorites
**DELETE** `/api/favorites`

Remove all articles from the user's favorites.

**Response:**
```json
{
  "message": "All favorites removed successfully"
}
```

## Search

### Search Articles
**GET** `/api/search`

Search for articles by name and category.

**Query Parameters:**
- `q` (optional): Search query
- `category` (optional): Filter by category

**Response:**
```json
{
  "articles": [
    {
      "id": "uuid",
      "name": "iPhone 12",
      "category": "Téléphones",
      "price": 799.99,
      "description": "Latest iPhone model",
      "whatsapp_number": "+1234567890",
      "additional_details": "64GB, Black",
      "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
      "average_rating": 4.50,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
  ]
}
```

## Ratings

### Rate Article
**POST** `/api/ratings/{articleId}`

Rate an article.

**Request Body:**
```json
{
  "rating": 5
}
```

**Response:**
```json
{
  "message": "Article rated successfully",
  "rating": {
    "id": "uuid",
    "user_id": "user-uuid",
    "article_id": "article-uuid",
    "rating": 5,
    "created_at": "2023-01-01T00:00:00Z"
  }
}
```

### Get Article Ratings
**GET** `/api/ratings/{articleId}`

Get all ratings for an article.

**Response:**
```json
{
  "ratings": [
    {
      "id": "uuid",
      "rating": 5,
      "created_at": "2023-01-01T00:00:00Z",
      "users": {
        "id": "user-uuid"
      }
    }
  ]
}
```

### Get User Rating
**GET** `/api/ratings/{articleId}/user`

Get the current user's rating for an article.

**Response:**
```json
{
  "rating": 5
}
```

## Orders

### Create Order
**POST** `/api/orders/{articleId}`

Create a new order for an article.

**Response:**
```json
{
  "message": "Order created successfully",
  "order": {
    "id": "uuid",
    "user_id": "user-uuid",
    "article_id": "article-uuid",
    "article_name": "iPhone 12",
    "article_price": 799.99,
    "ordered_at": "2023-01-01T00:00:00Z"
  }
}
```

### Get User Orders
**GET** `/api/orders`

Get the user's order history.

**Response:**
```json
{
  "orders": [
    {
      "id": "uuid",
      "user_id": "user-uuid",
      "article_id": "article-uuid",
      "article_name": "iPhone 12",
      "article_price": 799.99,
      "ordered_at": "2023-01-01T00:00:00Z"
    }
  ]
}
```

### Delete User Orders
**DELETE** `/api/orders`

Delete the user's order history.

**Response:**
```json
{
  "message": "Order history deleted successfully"
}
```

## Images

### Upload Image
**POST** `/api/images/upload`

Upload an image to ImageKit.

**Form Data:**
- `file`: The image file to upload

**Query Parameters:**
- `folder` (optional): Folder to upload to (default: "marketplace")

**Response:**
```json
{
  "message": "Image uploaded successfully",
  "image": {
    "url": "https://ik.imagekit.io/your_account/image.jpg",
    "fileId": "file-id"
  }
}
```

### Delete Image
**DELETE** `/api/images/delete/{fileId}`

Delete an image from ImageKit.

**Response:**
```json
{
  "message": "Image deleted successfully"
}