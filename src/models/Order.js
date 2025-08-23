class Order {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Create a new order
  async createOrder(userId, articleId, articleName, articlePrice) {
    const { data, error } = await this.supabase
      .from('orders')
      .insert([{
        user_id: userId,
        article_id: articleId,
        article_name: articleName,
        article_price: articlePrice
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get user's order history
  async getUserOrders(userId) {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('ordered_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Delete user's order history
  async deleteUserOrders(userId) {
    const { error } = await this.supabase
      .from('orders')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  }
}

module.exports = Order;