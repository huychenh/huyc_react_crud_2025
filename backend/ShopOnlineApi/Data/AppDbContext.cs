using Microsoft.EntityFrameworkCore;
using ShopOnline.Api.Models;

namespace ShopOnline.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products => Set<Product>();

        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "iPhone 15", Price = 999, Quantity = 10, Description = "Apple flagship" },
                new Product { Id = 2, Name = "Samsung S24", Price = 899, Quantity = 15, Description = "Samsung flagship" }
            );

            modelBuilder.Entity<User>().HasData(
               new User { Id = 1, FirstName = "Emily", LastName = "Johnson", Email = "emily.johnson@x.dummyjson.com" },
               new User { Id = 2, FirstName = "Michael", LastName = "Williams", Email = "michael.williams@x.dummyjson.com" }
           );
        }

    }
}
