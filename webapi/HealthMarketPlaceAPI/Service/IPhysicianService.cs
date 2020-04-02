using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthMarketPlaceAPI.Model;
using HealthMarketPlaceAPI.Models;
using HealthMarketPlaceAPI.Service;

namespace HealthMarketPlaceAPI.Service
{
    public interface IPhysicianService
    {
        Physician GetPhysician(string publicKey);
    }
}
