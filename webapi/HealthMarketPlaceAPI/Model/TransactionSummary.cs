using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthMarketPlaceAPI.Models;
using HealthMarketPlaceAPI.Service;

namespace HealthMarketPlaceAPI.Model
{
    public class TransactionSummary
    {
        public TransactionSummary (Physician physician, System.Double charges)
        {
            PublicKey = physician.PublicKey;
            QRCode = physician.QRCode;
            Charges = charges;
        }
        public string PublicKey { get; set; }
        public string QRCode { get; set; }
        
        public System.Double Charges { get; set; }


    }
}
