const BeachInfoService = require('../services/BeachInfoService');

const createBeachInfo = async (req, res) => {
    try {
        const beachInfoData = req.body;
        const beachInfo = await BeachInfoService.createBeachInfo(beachInfoData);
        if (beachInfo) {
            res.status(200).json(beachInfo);
        } else {
            res.status(404).json({error: 'Error creating beach info'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateBeachInfo = async (req, res) => {
    try {
        const {id, beachInfo} = req.body;
        const updatedBeachInfo = await BeachInfoService.updateBeachInfo(id, beachInfo);
        if (updatedBeachInfo) {
            res.status(200).json(updatedBeachInfo);
        } else {
            res.status(404).json({error: 'Error updating beach info'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getAllBeachInfo = async (req, res) => {
    try {
        const beachInfo = await BeachInfoService.getAllBeachInfo();
        res.status(200).json(beachInfo);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getBeachInfoById = async (req, res) => {
    try {
        const beachInfoId = req.params.id;
        const beachInfo = await BeachInfoService.getBeachInfoById(beachInfoId);
        if (beachInfo) {
            res.status(200).json(beachInfo);
        } else {
            res.status(404).json({error: 'Beach info not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteBeachInfo = async (req, res) => {
    try {
        const beachInfoId = req.body.id;
        const beachInfo = await BeachInfoService.deleteBeachInfo(beachInfoId);
        if (beachInfo) {
            res.status(200).json(beachInfo);
        } else {
            res.status(404).json({error: 'Beach info not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createBeachInfo,
    updateBeachInfo,
    getAllBeachInfo,
    getBeachInfoById,
    deleteBeachInfo
}