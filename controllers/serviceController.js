const Service = require('../models/service');

module.exports = {

    async createService(req, res){
        try {
            const service = req.body; 
            const data = await Service.registerService(service);
            return res.status(201).json({
                success: true,
                message: `Se realizo correctamente el registro`,
                data: data
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false, 
                message: `Error con el registro`,
                error: error
            })
        }  
    },

    async updateService(req, res){  
        try {
            const service = req.body; 
            await Service.update(service);
            return res.status(201).json({
                success: true,
                message: `Se realizo correctamente la actualizacion`
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false, 
                message: `Error con la actualizacion`,
                error: error
            })
        }
    },
    async getServices(req, res){
        try {           
            const data = await Service.getAll();
            return res.status(201).json({
                success: true,
                message: `Consulta exitosa`,
                data: data
            })
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false, 
                message: `Error con la consulta`,
                error: error
            })
        }           
    }
}