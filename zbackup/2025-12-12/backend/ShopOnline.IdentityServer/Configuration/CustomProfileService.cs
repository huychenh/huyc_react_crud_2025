using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Identity;
using ShopOnline.IdentityServer.Models;
using System.Security.Claims;

namespace ShopOnline.IdentityServer.Configuration
{
    public class CustomProfileService : IProfileService
    {
        private readonly UserManager<AppUser> _userManager;

        public CustomProfileService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);
            if (user == null)
                return;

            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, user.UserName ?? ""),
                new Claim("name", user.FullName ?? user.UserName ?? ""),
                new Claim("email", user.Email ?? ""),
                new Claim("sub", user.Id ?? "")                
            };

            // Get role from Identity
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));                
            }

            context.IssuedClaims.AddRange(claims);
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);
            context.IsActive = user != null;
        }
    }
}
