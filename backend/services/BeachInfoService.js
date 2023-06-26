const BeachInfo = require('../models/BeachInfoSchema');

const createBeachInfo = async (beachInfoData) => {
    const beachInfo = new BeachInfo({
        // name: beachInfoData.name,
        // location: beachInfoData.location,
        // description: beachInfoData.description,
        // image: beachInfoData.image
    });

    const savedBeachInfo = await beachInfo.save();
    return savedBeachInfo;
}

const updateBeachInfo = async (beachInfoId, beachInfo) => {
    try {
        const updatedBeachInfo = await BeachInfo.findByIdAndUpdate(beachInfoId, beachInfo, { new: true });
        if (!updatedBeachInfo) {
            throw new Error(`Beach info with ID ${beachInfoId} not found.`);
        }
        return updatedBeachInfo;
    } catch (e) {
        console.log("BeachInfoService:" + e);
    }
}

const getAllBeachInfo = async () => {
    try {
        const beachInfo = await BeachInfo.find();
        if (beachInfo)
            return beachInfo;
    } catch (e) {
        console.log("BeachInfoService:" + e);

    }
}

const getBeachInfoById = async (beachInfoId) => {
    try {
        const beachInfo = await BeachInfo.findById(beachInfoId);
        if (!beachInfo) {
            console.log(`Beach info with ID ${beachInfoId} not found.`);
        }
        return beachInfo;
    } catch (e) {
        console.log("BeachInfoService:" + e);
    }
}

const deleteBeachInfo = async (beachInfoId) => {
    try {
        const beachInfo = await BeachInfo.findByIdAndDelete(beachInfoId);
        if (!beachInfo) {
            console.log(`Beach info with ID ${beachInfoId} not found.`);
        }
        return beachInfo;
    } catch (e) {
        console.log("BeachInfoService:" + e);
    }
}

module.exports = {
    createBeachInfo,
    updateBeachInfo,
    getAllBeachInfo,
    getBeachInfoById,
    deleteBeachInfo
}
