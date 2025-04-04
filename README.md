# 📺 Digital Signage Local (TV Corporativa)

Sistema de exibição de campanhas visuais (imagens e vídeos) em modo **TV Corporativa**, desenvolvido com **Next.js + Node.js + SQLite**. Ideal para ambientes escolares, empresariais ou qualquer espaço que precise de comunicação visual dinâmica — 100% offline.

---

## 🚀 Funcionalidades

- 👩‍💼 Painel administrativo para:
  - Criar campanhas
  - Fazer upload de **imagens** e **vídeos**
  - Definir a duração de exibição (imagens)
- 🖥️ Exibição das campanhas em **tela cheia**
- ⏱️ Timer automático entre as mídias
- 📂 Armazenamento local (SQLite + uploads locais)
- 🌐 Rotas dinâmicas por campanha: `/campanha/[slug]`

---

## 🛠️ Tecnologias utilizadas

### Frontend (`digital-front`)
- [Next.js](https://nextjs.org/) (com App Router)
- CSS customizado
- Fetch para chamadas HTTP

### Backend (`back-end`)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Multer](https://github.com/expressjs/multer) para upload de arquivos

---

## 🧱 Estrutura do Banco de Dados

- **Campanhas**
  - `id`
  - `nome`
  - `slug`

- **Mídias**
  - `id`
  - `path` (imagem ou vídeo)
  - `type` (`image` ou `video`)
  - `duration` (para imagens)
  - `campanha_id` (FK)

---

## ⚙️ Como rodar localmente

### 1. Clone os repositórios
```bash
git clone <repositorio-frontend>
git clone <repositorio-backend>
```

### 2. Instale as dependências

```bash
# Frontend
cd digital-front
npm install

# Backend
cd ../back-end
npm install
```

### 3. Inicie os servidores

```bash
# Backend (porta 4000, por exemplo)
npm start

# Frontend (porta 3000)
npm run dev
```

### 4. Acesse

- Painel admin: `http://localhost:3000`
- Exibição da campanha: `http://localhost:3000/campanha/nome-da-campanha`

---

## 🧪 Exemplo de uso

1. Crie uma campanha chamada `Informativo`.
2. Adicione imagens e vídeos à campanha.
3. Acesse `/play/[slug]` sendo o [slug] o id da campanha.
---

## 📄 Licença

Este projeto é open source e pode ser usado livremente para fins educacionais e corporativos internos.

---