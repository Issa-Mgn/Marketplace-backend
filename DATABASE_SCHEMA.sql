-- Table Users
-- Cette table gérera les utilisateurs anonymes avec leur identifiant unique.
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table Articles
-- Cette table stockera toutes les informations relatives aux articles publiés.
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price VARCHAR(50) NOT NULL,
  description TEXT,
  whatsapp_number VARCHAR(20) NOT NULL,
  additional_details TEXT,
  image_urls TEXT[], -- URLs des images stockées sur ImageKit
  average_rating DECIMAL(3, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Favorites
-- Cette table gérera les articles favoris de chaque utilisateur.
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Table Ratings
-- Cette table gérera les notes attribuées aux articles par les utilisateurs.
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Table Orders
-- Cette table gérera l'historique des commandes passées par les utilisateurs.
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  article_name VARCHAR(255),
  article_price VARCHAR(50),
  ordered_at TIMESTAMP DEFAULT NOW()
);

-- Indexes pour de meilleures performances
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_name ON articles(name);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_ratings_article_id ON ratings(article_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);