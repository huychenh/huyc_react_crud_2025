using System;
using System.Collections.Generic;
using System.Text;

namespace ShopOnline.Common
{
    public class BaseObject
    {
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}
