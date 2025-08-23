class User {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Get or create user by ID
  async getOrCreate(userId) {
    // Try to get existing user
    let { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    // If user doesn't exist, create it
    if (error || !data) {
      const { data: newUser, error: createError } = await this.supabase
        .from('users')
        .insert([{ id: userId }])
        .select()
        .single();

      if (createError) throw createError;
      return newUser;
    }

    return data;
  }

  // Get user by ID
  async getById(userId) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = User;