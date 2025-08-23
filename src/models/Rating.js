class Rating {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Rate an article
  async rateArticle(userId, articleId, rating) {
    // Check if user has already rated this article
    const { data: existingRating, error: fetchError } = await this.supabase
      .from('ratings')
      .select('id')
      .eq('user_id', userId)
      .eq('article_id', articleId)
      .maybeSingle();

    let result;
    if (existingRating) {
      // Update existing rating
      const { data, error } = await this.supabase
        .from('ratings')
        .update({ rating })
        .eq('id', existingRating.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new rating
      const { data, error } = await this.supabase
        .from('ratings')
        .insert([{ user_id: userId, article_id: articleId, rating }])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    // Update article's average rating
    await this.updateArticleAverageRating(articleId);
    return result;
  }

  // Get article ratings
  async getArticleRatings(articleId) {
    const { data, error } = await this.supabase
      .from('ratings')
      .select(`
        id,
        rating,
        created_at,
        users (
          id
        )
      `)
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get user's rating for an article
  async getUserRating(userId, articleId) {
    const { data, error } = await this.supabase
      .from('ratings')
      .select('rating')
      .eq('user_id', userId)
      .eq('article_id', articleId)
      .maybeSingle();

    if (error) throw error;
    return data ? data.rating : null;
  }

  // Update article's average rating
  async updateArticleAverageRating(articleId) {
    const { data: ratings, error } = await this.supabase
      .from('ratings')
      .select('rating')
      .eq('article_id', articleId);

    if (error) throw error;

    // Calculate average rating
    if (ratings.length === 0) {
      // No ratings, set average to 0
      await this.supabase
        .from('articles')
        .update({ average_rating: 0.00 })
        .eq('id', articleId);
    } else {
      // Calculate average
      const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
      const average = sum / ratings.length;
      
      // Update article with new average
      await this.supabase
        .from('articles')
        .update({ average_rating: parseFloat(average.toFixed(2)) })
        .eq('id', articleId);
    }
  }
}

module.exports = Rating;