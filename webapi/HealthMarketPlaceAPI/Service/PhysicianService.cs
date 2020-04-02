using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthMarketPlaceAPI.Model;
using HealthMarketPlaceAPI.Models;
using HealthMarketPlaceAPI.Service;

namespace HealthMarketPlaceAPI.Service
{
    public class PhysicianService: IPhysicianService
    {
        public healthdbContext dbhealthdbContext;
        private Physician objPhysician = null;
        public PhysicianService(healthdbContext _dbhealthdbContext)
        {
            dbhealthdbContext = _dbhealthdbContext;
        }
        public Physician GetPhysician(string publicKey)
        {
            var physician = (
                from phys in dbhealthdbContext.Physician
                where phys.PublicKey.ToUpper() == publicKey.ToUpper()
                select new
                {
                    PhysicianID = phys.PhysicianID,
                    PublicKey = phys.PublicKey,
                    QRCode = phys.QRCode
                }
                ).FirstOrDefault();
            if (physician != null)
            {
                objPhysician = new Physician();
                objPhysician.PhysicianID = physician.PhysicianID;
                objPhysician.PublicKey = physician.PublicKey;
                objPhysician.QRCode = physician.QRCode;
            }

           return objPhysician;
        }

    }
}
