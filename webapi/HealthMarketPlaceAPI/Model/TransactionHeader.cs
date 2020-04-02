using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using HealthMarketPlaceAPI.Model;

namespace HealthMarketPlaceAPI.Model
{
    public class TransactionHeader
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TransactionHeader()
        {
            //TransactionDetails = new HashSet<TransactionDetail>();
            TransactionDate = DateTime.UtcNow;
        }
        public System.Int64 TransactionHeaderID { get; set; }

        [StringLength(500)]
        public string PhysicianKey { get; set; }
        [StringLength(500)]
        public string PatientKey { get; set; }
        public int TimeElapsed { get; set; }
        public System.DateTime TransactionDate { get; set; }
        public virtual TransactionSummary GetSummary(Physician phys)
        {
            System.Double token = 0;
            System.Double unit = 60.00;
            int tokenRate = 1;
            token = (TimeElapsed / unit * tokenRate) + 1.00;
            token = Math.Round(token,2);
            TransactionSummary summary = new TransactionSummary(phys, token);
            return summary;
            
        }

    }
}
