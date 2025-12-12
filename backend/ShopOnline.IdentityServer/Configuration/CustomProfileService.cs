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
                new Claim("sub", user.Id),
                new Claim("name", user.FullName ?? user.UserName ?? ""),
                new Claim("email", user.Email ?? "")
            };

            // Get roles
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                // Add both claims: "role" and ClaimTypes.Role
                claims.Add(new Claim("role", role));
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var requestedClaims = context.RequestedClaimTypes;

            context.IssuedClaims.AddRange(
                claims.Where(c => requestedClaims.Contains(c.Type))
            );
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);
            context.IsActive = user != null;
        }
    }
}
