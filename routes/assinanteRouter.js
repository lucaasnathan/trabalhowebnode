const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/images/' });
const assinanteController = require('../controllers/assinanteController');

router.post('/', assinanteController.salvar);
router.get('/', assinanteController.listar);
router.get('/:id', assinanteController.buscarPorid);
router.get('/nome/:nome', assinanteController.buscarPorNome);
router.get('/sobrenome/:sobrenome', assinanteController.buscarPorSobrenome);
router.get('/cidade/:cidade', assinanteController.buscarPorCidade);
router.get('/estado/:estado', assinanteController.buscarPorEstado);
router.get('/status/:status', assinanteController.buscarPorStatus);
router.put('/:id', assinanteController.atualizar);
router.delete('/:id', assinanteController.deletar);
router.put('/assinante/:id', upload.single('imagem'), assinanteController.editar);


module.exports = router;
