<div align="center">
	<br>
	<br>
    <picture>
      <img width="959" height="440" alt="image" src="https://github.com/user-attachments/assets/00992d18-5897-4717-a420-afb722ae6150" />
    </picture>
	<br>
	<br>
</div>

## Dokumentasi
Ini adalah panduan untuk menjalankan projek secara lokal dan production
### Installation ###
ada dua cara menjalankan projek ini secara lokal dan juga live production
#### Menjalankan dalam lokal projek ####
```
git clone https://github.com/fadliraamdhn/fadli_api_crm.git
git branch dev
bun install
bun run dev
```
branch main pada projek ini hanya inisiasi, branch yang dipakai untuk development adalah branch dev jadi anda harus pindah dulu ke branch dev untuk menjalankan projek ini.
lalu tambahkan .env sesuai kebutuhan yang sudah saya siapkan pada file .env.example lalu ini adalah API jadi anda harus menjalankan juga projek frontendnya pada repository ini : https://github.com/fadliraamdhn/fadli_ui_crm
### Mendeploy Projek ###
projek ini bisa di deploy melalui railway.
* Fork repository ini
* buat service di railway
* pilih repository
* pilih branch dev
* pilih dockerfile yang disiapkan pada projek ini agar berjalan dengan lancar
