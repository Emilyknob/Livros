import livros from "../models/Livro.js";

class LivroController {

	static listarLivros = async (req, res, next) => {
		try {
			const result = await livros.find()
				.populate("autor")
				.exec();
			res.json(result);
		} catch (err) {
			next(err);
		}
	};

	static listarLivroPorId = async (req, res, next) => {
		try {
			const id = req.params.id;
			const result = await livros.findById(id)
				.populate("autor", "nome")
				.exec();


			if (result !== null) {
				res.send(result);
			} else {
				next(new NaoEncontrado("ID do autor não localizado!"));
			}

		} catch (err) {
			next(err);
		}
	};

	static cadastrarLivro = async (req, res, next) => {
		try {
			let livro = new livros(req.body);
			const result = await livro.save();

			res.send(result.toJSON());

		} catch (err) {
			next(err);
		}
	};

	static atualizarLivro = async (req, res, next) => {
		try {
			const id = req.params.id;
			const atualizacao = req.body;
			const result = await livros.findByIdAndUpdate(id, atualizacao);

			if (result !== null) {
				res.send(result);
			} else {
				next(new NaoEncontrado("ID do autor não localizado!"));
			}

		} catch (err) {
			next(err);
		}
	};

	static excluirLivro = async (req, res, next) => {
		try {
			const id = req.params.id;
			const result = await livros.findByIdAndDelete(id);

			if (result !== null) {
				res.send(result);
			} else {
				next(new NaoEncontrado("ID do autor não localizado!"));
			}

		} catch (err) {
			next(err);
		}
	};

	static listarLivroPorEditora = async (req, res, next) => {
		try {
			const editora = req.query.editora;
			const result = await livros.find({ "editora": editora });

			res.send(result);
		} catch (err) {
			next(err);
		}
	};
}

export default LivroController;