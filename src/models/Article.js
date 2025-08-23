class Article {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Create a new article
  async create(articleData) {
    const { data, error } = await this.supabase
      .from('articles')
      .insert([articleData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get an article by ID
  async getById(id) {
    const { data, error } = await this.supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Update an article
  async update(id, updates) {
    const { data, error } = await this.supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Delete an article
  async delete(id) {
    const { error } = await this.supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  // List all articles with optional filters
  async list(filters = {}) {
    let query = this.supabase
      .from('articles')
      .select('*');

    // Apply filters if provided
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Update article rating
  async updateRating(articleId, newAverageRating) {
    const { data, error } = await this.supabase
      .from('articles')
      .update({ average_rating: newAverageRating })
      .eq('id', articleId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = Article;