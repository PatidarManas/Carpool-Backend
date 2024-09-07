import Ride from '../models/ride.js';
import Notification from '../models/Notification.js';
import User from '../models/user.js';

export const createRide = async (req, res) => {
  try {
    const ride = new Ride({ ...req.body, createdBy: req.user._id, numberOfAvailableSeats : req.body.numberOfSeats });
    await ride.save();
    res.status(201).json({ message: 'Ride created successfully', ride });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    await Ride.findByIdAndDelete(rideId);
    res.status(200).json({ message: 'Ride canceled successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changeRideStatus = async (req, res) => {
  try {
    const { rideId, status } = req.body;
    const ride = await Ride.findByIdAndUpdate(rideId, { status }, { new: true });
    res.status(200).json({ message: `Ride status changed to ${status}`, ride });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const RideDetails = async (req,res) => {
  try {
    const { rideId } = req.query;
    console.log(rideId)
    const ride = await Ride.findById(rideId);
    const user = await User.findById(ride.createdBy);
    res.status(200).json({ride,user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export const getRides = async (req,res)=>{
  try {
    let { startPoint, endPoint, startDateTime } = req.body;
    // startPoint = JSON.parse(startPoint);  
    // endPoint = JSON.parse(endPoint);
    console.log(startPoint)

    if (!startPoint || !endPoint || !startDateTime) {
      return res.status(400).json({ message: 'Please provide startPoint, endPoint, and startDateTime.' });
    }

    let feasibleRidesFounded = await findFeasibleRides(startPoint, endPoint, new Date(startDateTime));
    let feasibleRides = [];
     await Promise.all(feasibleRidesFounded?.map(async (ride) => {
      const user = await User.findById(ride.createdBy);
      feasibleRides.push({ride, user});
    }));
    console.log(feasibleRides);
    return res.status(200).json(feasibleRides);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}











//

const EARTH_RADIUS_KM = 6371;

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversineDistance([lon1, lat1], [lon2, lat2]) {
  // console.log(lon2,lat2)
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

console.log(haversineDistance([12.95515,77.56709],[12.955179999999999,77.56743]));

async function findFeasibleRides(startPoint, endPoint, startDateTime) {
  console.log(typeof(startPoint));
  const rides = await Ride.find({
    dateTimeOfStartRide: {
      $gte: new Date(startDateTime.getTime() - 6 * 60 * 60 * 1000), // 6 hours before
      $lte: new Date(startDateTime.getTime() + 6 * 60 * 60 * 1000), // 6 hours after
    }
  });
  console.log(rides)
  return rides.filter(ride => {
    const startMatch = ride.path.some(point =>  haversineDistance([point[1],point[0]], startPoint) <= 1);
    const endMatch = ride.path.some(point => haversineDistance([point[1],point[0]], endPoint) <= 1);

    return startMatch && endMatch;
  });
}
