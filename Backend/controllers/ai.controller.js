import { main } from "../config/ai.service.js";

export const AIController = async (req, res) => {
      try {
        
          const { prompt } = req.body;

          console.log(prompt);

          if(!prompt){
            return res.status(400).json({
               message: "Prompt is required",
            });
          }

          const result = await main({prompt});

          console.log(result);

          return res.status(200).json({
            result,
          });

      } catch (error) {
         console.log(error);
         res.status(500).json({
            message: "Error in AI Controller",
            error: error.message,
         });
      }
};