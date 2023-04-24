import livros from "../models/Livro.js";

class LivroController {

	static listarLivros = async (req, res) => {
		try {
			const result = await livros.find()
				.populate("autor")
				.exec();
			res.json(result);
		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static listarLivroPorId = async (req, res) => {
		try {
			const id = req.params.id;
			const result = await livros.findById(id)
				.populate("autor", "nome")
				.exec();
			
			res.send(result);

		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static cadastrarLivro = async (req, res) => {
		try {
			let livro = new livros(req.body);
			const result = await livro.save();

			res.send(result.toJSON());
			
		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static atualizarLivro = async (req, res) => {
		try {
			const id = req.params.id;
			const atualizacao = req.body;
			const result = await livros.findByIdAndUpdate(id, atualizacao);
			
			res.send(result);
		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static excluirLivro = async (req, res) => {
		try {
			const id = req.params.id;
			const result = await livros.findByIdAndDelete(id);

			res.send(result);
		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};

	static listarLivroPorEditora = async (req, res) => {
		try {
			const editora = req.query.editora;
			const result = await livros.find({ "editora": editora });

			res.send(result);
		} catch (err) {
			res.status(500).send({
				error: err.message
			})
		}
	};
}

export default LivroController;