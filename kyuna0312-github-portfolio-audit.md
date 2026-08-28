# kyuna0312 GitHub Portfolio Audit

**Шалгасан профайл:** [github.com/kyuna0312](https://github.com/kyuna0312)  
**Ерөнхий үнэлгээ:** 7/10  
**Дүгнэлт:** Техникийн сонирхол, өвөрмөц identity сайн харагддаг боловч ажил олгогчид “ямар түвшний developer, ямар асуудал шийддэг хүн бэ?” гэдгийг шууд ойлгуулах талдаа сайжруулах шаардлагатай.

## Сайн байгаа зүйлс

- Linux, anime/cosplay, cyberpunk чиглэлтэй өөрийн гэсэн өнгө төрхтэй.
- Олон public repository, follower, GitHub achievement болон Developer Program Member статус нь идэвхтэй developer гэсэн дохио өгдөг.
- Pinned төслүүд Nushell, Lua, C, Rust, C++ зэрэг өргөн технологийн хүрээг харуулж байна.
- [`dotfiles`](https://github.com/kyuna0312/dotfiles) төсөл сайн боловсруулсан README, install заавар, олон OS-ийн support, architecture болон нэгтгэсэн design system-тэй.
- [`NyanVim`](https://github.com/kyuna0312/NyanVim) төсөл CI workflow, install script, showcase, performance benchmark, health check болон license-тай тул бодитоор хэрэглэж болох бүтээгдэхүүн шиг харагдаж байна.

## Гол асуудлууд

### 1. Profile README хэт ерөнхий

“Linux Enthusiast”, “Developer”, “Dreamer” зэрэг тайлбар personality-г илэрхийлж байгаа боловч техникийн capability-г тодорхой нотлохгүй. Stats, trophy, typing animation зэрэг нь recruiter-д хамгийн хэрэгтэй мэдээллийг доош түлхэж байна.

Profile-ийн эхний хэсэгт дараахтай төстэй positioning ашиглаж болно:

> Systems & tooling developer from Mongolia. I build developer environments, editors, low-level experiments, and open-source tools using Rust, C/C++, Lua and TypeScript.

Үүний дараа дараах мэдээллийг товч харуулна:

- What I build
- 3 selected projects
- Current focus
- Contact болон portfolio

### 2. Pinned repository-нуудын тайлбар сул

`Toy Version Control System`, `My test Operating system`, `custom toy browser` зэрэг хэллэг нь хийсэн ажлын үнэ цэнийг санаандгүйгээр бууруулж байна.

Санал болгох шинэ тайлбарууд:

- **nyanix_scratch_linux:** Experimental x86 operating system kernel written in C, exploring boot, memory and hardware interfaces.
- **nyan_browser:** Experimental browser prototype in Rust built to explore browser architecture and Mozilla components.
- **kit-vcs:** A Git-inspired version-control system written in C++ to demonstrate object storage, commits and branching.

“Toy” эсвэл “test” гэж нэрлэхийн оронд ямар зүйл хэрэгжүүлсэн, ямар асуудлыг судалсан гэдгийг онцлох хэрэгтэй.

### 3. Pinned төслүүдийн сонголт portfolio-ийн зорилгыг тодорхой хэлэхгүй

Одоогийн сонголт техникийн өргөн сонирхлыг харуулдаг ч production application хийж чаддаг эсэхийг бүрэн нотлохгүй.

Санал болгох дараалал:

1. Dotfiles
2. NyanVim
3. Хамгийн бүрэн болсон Rust, C эсвэл C++ төсөл
4. Deploy хийсэн full-stack бүтээгдэхүүн
5. Open-source contribution эсвэл reusable library
6. Монгол хэл эсвэл дата дээр хийсэн онцгой төсөл

`Word2VectorMongolia` archived бөгөөд одоогийн ур чадварыг сайн төлөөлөхгүй бол pin-ээс авч болно.

### 4. Төслийн нотолгоо дутуу

Гол repository бүрд дараах зүйлсийг нэмэх нь төслийн чанарын perception-ийг сайжруулна:

- Demo GIF эсвэл 20–40 секундийн видео
- Why I built this
- Architecture diagram
- Гол technical decisions
- Test болон CI status
- Roadmap
- Release болон tag
- Өөрийн хийсэн contribution
- Known limitations

README нь зөвхөн суулгах заавар биш, жижиг **case study** байх хэрэгтэй.

### 5. Мэргэжлийн үндсэн чиглэл тодорхойгүй

Одоогоор systems developer, DevOps, security, editor tooling, web developer чиглэлүүдийн аль нь үндсэн болох нь бүдэг байна.

Одоогийн төслүүдэд хамгийн тохирох positioning:

> **Systems & Developer Tooling Engineer**  
> Rust, C/C++, Lua, Linux, terminal tooling, editor workflows.

Web болон full-stack чадварыг үүний дараах secondary чиглэл болгон харуулж болно.

### 6. Repository цэвэрлэгээ хэрэгтэй

- `.DS_Store` файлуудыг repository-оос арилгах
- Repository description-уудын англи хэл, capitalization-ийг нэг хэлбэртэй болгох
- Repository бүрд тохирох topics нэмэх
- Default branch нэрийг боломжтой бол `main` болгон жигдлэх
- Гол repository-нууддаа license, CI, release болон contributing мэдээлэл нэмэх
- Profile дээрх хэлний мэдээллийг `EN | 日本語 | Монгол` гэж гүйцээх
- Portfolio болон social profile бүрд нэг canonical URL ашиглах

## Долоо хоногийн сайжруулалтын төлөвлөгөө

### 1 дэх өдөр

Profile README-г recruiter-oriented бүтэцтэй болгох.

### 2 дахь өдөр

Pinned repository болон бусад гол repository-н description-уудыг шинэчлэх.

### 3–4 дэх өдөр

NyanVim болон dotfiles төслүүдэд demo GIF, releases, CI badges нэмэх.

### 5 дахь өдөр

Нэг low-level төслөө сонгон architecture, technical decisions болон roadmap-тай case study болгох.

### 6–7 дахь өдөр

Шууд туршиж үзэх боломжтой, deploy хийсэн нэг polished full-stack төсөл нэмэх.

## Эцсийн дүгнэлт

Шинээр олон төсөл эхлүүлэхээс илүү одоо байгаа хамгийн сайн гурван төслөө мэргэжлийн түвшинд тайлбарлаж, demo болон техникийн нотолгоотойгоор package хийх нь portfolio-д илүү хүчтэй нөлөөлнө.

Чиний GitHub дээр хийх зүйл дутуу биш. Харин хийсэн зүйлсээ зөв эрэмбэлж, үнэ цэнийг нь ойлгомжтой харуулах ажил хамгийн их үр дүн авчирна.

## Холбоосууд

- [GitHub profile](https://github.com/kyuna0312)
- [dotfiles](https://github.com/kyuna0312/dotfiles)
- [NyanVim](https://github.com/kyuna0312/NyanVim)
