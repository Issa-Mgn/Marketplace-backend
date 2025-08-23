class Favorite {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Add an article to user's favorites
  async addFavorite(userId, articleId) {
    const { data, error } = await this.supabase
      .from('favorites')
      .insert([{ user_id: userId, article_id: articleId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Remove an article from user's favorites
  async removeFavorite(userId, articleId) {
    const { error } = await this.supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('article_id', articleId);

    if (error) throw error;
    return true;
  }

  // Get user's favorite articles
  async getUserFavorites(userId) {
    const { data, error } = await this.supabase
      .from('favorites')
      .select(`
        id,
        article_id,
        articles (
          id,
          name,
          price,
          image_urls
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Check if an article is in user's favorites
  async isFavorite(userId, articleId) {
    const { data, error } = await this.supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('article_id', articleId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  }

  // Remove all favorites for a user
  async removeAllFavorites(userId) {
    const { error } = await this.supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  }
}

module.exports = Favorite;