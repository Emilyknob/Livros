import mongoose from "mongoose";

const AutoreSchema = new mongoose.Schema(
	{
		id: { type: String },
		nome: { 
			type: String, 
			required: [true, "O nome do(a) autor(a) é obrigatório!"]
		},
		nacionalidade: { type: String}
	},
	{
		versionKey: false
	}
);

const autores = mongoose.model("autores", AutoreSchema);

export default autores;