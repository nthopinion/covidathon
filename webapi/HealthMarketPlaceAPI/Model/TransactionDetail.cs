using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMarketPlaceAPI.Model
{
    public class TransactionDetail
    {
        public TransactionDetail()
        {

        }
        public System.Int64 TransactionDetailID { get; set; }
        public System.Int64 TransactionHeaderID { get; set; }

        [StringLength(50)]
        public string ChargeType { get; set; }
        [StringLength(255)]
        public Decimal ChargeValue { get; set; }
    }
}
