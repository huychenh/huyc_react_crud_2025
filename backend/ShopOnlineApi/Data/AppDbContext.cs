using Microsoft.EntityFrameworkCore;
using ShopOnline.Api.Models;

namespace ShopOnline.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "iPhone 15", Price = 999, Quantity = 10, Description = "Apple flagship" },
                new Product { Id = 2, Name = "Samsung S24", Price = 899, Quantity = 15, Description = "Samsung flagship" }
            );
        }

    }
}
