module.exports = {
    verify: (request, response, next) => {
        if(request.body.paineis.produtividade || request.body.paineis.detalhe || request.body.paineis.maquinas)
            next();
        else
            response.status(500).send('Escolha pelo menos uma tela para prosseguir!');
    },
    hasConfig: (request, response, next) => {
        if(request.session.config) next();
        else response.redirect('/painel');
    },
    selected: (paineis) => {
        let panels = {};
        if(paineis.painelProdutividade == 'on')
            panels.produtividade = true;

        if(paineis.painelMaquinas == 'on')
            panels.maquinas = true;

        if(paineis.painelParadas == 'on')
            panels.paradas = true;

        return panels;
    },
    switch: (path, paineis) => {
        if(path.includes('produtividade')) {
            if(paineis.maquinas) return 'maquinas';
            if(paineis.paradas) return 'paradas';

            return 'produtividade';
        }

        if(path.includes('maquinas')) {
            if(paineis.paradas) return 'paradas';
            if(paineis.produtividade) return 'produtividade';

            return 'maquinas';
        }

        if(path.includes('paradas')) {
            if(paineis.produtividade) return 'produtividade';
            if(paineis.maquinas) return 'maquinas';

            return 'paradas';
        }
    }
};