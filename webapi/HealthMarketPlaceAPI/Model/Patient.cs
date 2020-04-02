using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMarketPlaceAPI.Model
{
    public class Patient
    {

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Patient()
        {

        }
        public System.Int64 PatientID { get; set; }

        [StringLength(500)]
        public string PublicKey { get; set; }
        [StringLength(500)]
        public string QRCode { get; set; }



    }
}
