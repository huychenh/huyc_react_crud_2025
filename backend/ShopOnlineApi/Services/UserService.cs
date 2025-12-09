using AutoMapper;
using ShopOnline.Api.Models;
using ShopOnline.Api.Repositories;
using ShopOnline.Common;

namespace ShopOnline.Api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserReadDto>> GetAllAsync()
        {
            var Users = await _repo.GetAllAsync();
            return _mapper.Map<IEnumerable<UserReadDto>>(Users);
        }

        public async Task<UserReadDto?> GetByIdAsync(int id)
        {
            var User = await _repo.GetByIdAsync(id);
            return User == null ? null : _mapper.Map<UserReadDto>(User);
        }

        public async Task<UserReadDto> AddAsync(UserCreateDto dto)
        {
            var User = _mapper.Map<User>(dto);
            await _repo.AddAsync(User);
            return _mapper.Map<UserReadDto>(User);
        }

        public async Task<bool> UpdateAsync(int id, UserUpdateDto dto)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing is null) return false;

            _mapper.Map(dto, existing); // update dto field to existing entity
            return await _repo.UpdateAsync(id, existing);
        }


        public Task<bool> DeleteAsync(int id)
            => _repo.DeleteAsync(id);
    }
}
