import api from "../../api"; // Importa a API para comunicação com o backend
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro
import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import styles from "./Adicionar.module.css"; // Importa os estilos CSS para este componente
import logo from "../../utils/assets/logo.svg"; // Importa um arquivo de logo para uso na barra de navegação
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento de rotas
import NavBar from "../../components/navbar/NavBar"; // Importa o componente NavBar para a barra de navegação
import imgCantor from "../../utils/assets/pessoa-ouvindo-disco.svg"; // Importa uma imagem ilustrativa

function Adicionar() {
    const navigate = useNavigate(); // Inicializa o hook de navegação
    const [ano, setAno] = useState(""); // Estado para armazenar o ano da música
    const [genero, setGenero] = useState(""); // Estado para armazenar o gênero da música
    const [imagem, setImagem] = useState(""); // Estado para armazenar o URL da imagem da música
    const [artista, setArtista] = useState(""); // Estado para armazenar o nome do artista
    const [nomeMusica, setNomeMusica] = useState(""); // Estado para armazenar o nome da música

    const handleSave = () => { // Função chamada ao clicar em salvar
        const objetoAdicionado = { // Cria um objeto com os dados do formulário
            nomeMusica,
            artista,
            genero,
            ano,
            imagem
        };

        // Faz uma requisição POST para a API
        api.post(``, objetoAdicionado).then(() => {
            toast.success("Novo Card criado com sucesso!"); // Exibe uma mensagem de sucesso
            sessionStorage.setItem("editado", JSON.stringify(objetoAdicionado)); // Armazena os dados na sessionStorage
            navigate("/musicas"); // Redireciona para a página de músicas
        }).catch(() => {
            toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente."); // Exibe uma mensagem de erro se a requisição falhar
        })
    };

    const handleInputChange = (event, setStateFunction) => { // Função para manipular as mudanças nos inputs
        setStateFunction(event.target.value); // Atualiza o estado correspondente
    }

    const handleBack = () => { // Função chamada ao clicar em cancelar
        navigate("/musicas"); // Redireciona para a página de músicas
    };

    return (
        <>
            <NavBar logoInicio={logo} /> {/* Componente NavBar com logo */}

            <div className={styles["container-adicionar"]}> {/* Container principal para o formulário */}
                <div className={styles["secao-esquerda-adicionar"]}> {/* Seção esquerda contendo o formulário */}
                    <form>
                        <h1>Adicionar</h1> {/* Título do formulário */}
                        {/* Inputs para cada campo do formulário */}
                        <input type="text" value={nomeMusica} placeholder="Nome da música" onChange={(e) => handleInputChange(e, setNomeMusica)} />
                        <input type="text" value={artista} placeholder="Artista" onChange={(e) => handleInputChange(e, setArtista)} />
                        <input type="text" value={genero} placeholder="Gênero" onChange={(e) => handleInputChange(e, setGenero)} />
                        <input type="text" value={ano} placeholder="Ano de Lançamento" onChange={(e) => handleInputChange(e, setAno)} />
                        <input type="text" value={imagem} placeholder="URL da Imagem" onChange={(e) => handleInputChange(e, setImagem)} />
                        <div className={styles["buttons-container"]}> {/* Container para os botões de ação */}
                            <button type="button" onClick={handleSave}>Salvar</button> {/* Botão para salvar os dados */}
                            <button type="button" onClick={handleBack}>Cancelar</button> {/* Botão para cancelar e voltar */}
                        </div>
                    </form>
                </div>
                <div className={styles["secao-direita-adicionar"]}> {/* Seção direita contendo a imagem ilustrativa */}
                    <img src={imgCantor} alt="Imagem de uma pessoa ouvindo música" />
                </div>
            </div>

        </>
    );
}
export default Adicionar; // Exporta o componente Adicionar