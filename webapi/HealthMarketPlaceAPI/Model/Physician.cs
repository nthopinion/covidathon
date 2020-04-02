using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMarketPlaceAPI.Model
{
    public class Physician
    {
        public Physician()
        {

        }
        public System.Int64 PhysicianID { get; set; }

        [StringLength(500)]
        public string PublicKey { get; set; }
        [StringLength(500)]
        public string QRCode { get; set; }

    }
}
