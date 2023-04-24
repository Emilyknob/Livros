import autores from "../models/Autor.js";

class AutorController {

	static listarAutores = async (req, res) => {
		try {
			const autoresResultado = await autores.find();

			res.send(autoresResultado);
			
		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static listarAutorPorId = async (req, res) => {
		try {
			const id = req.params.id;

			const result = await autores.findById(id);

			if(!result)
				throw new Error('ID de autor não localizado!')
			res.send(result);

		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static cadastrarAutor = async (req, res) => {
		try {
			let autor = new autores(req.body);
			
			const result = await autor.save();

			if (!result)
				throw new Error('Erro ao cadastrar autor');
			res.send(result.toJSON());

		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static atualizarAutor = async (req, res) => {
		try {
			const id = req.params.id;
			const atualizacao = req.body;

			const result = await autores.findByIdAndUpdate(id, atualizacao);

			if(!id)
				throw new Error('ID do autor inválido!');
			if(!atualizacao)
				throw new Error('Erro na Atualização!');
			res.send(result)

		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static excluirAutor = async (req, res) => {
		try {
			const id = req.params.id;
			const result = await autores.findByIdAndDelete(id);

			if(!result)
				throw new Error('ID inválido!');
			res.send(result);
			
		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};
}

export default AutorController;