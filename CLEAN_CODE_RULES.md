# Clean Code — Дүрмүүдийн бүрэн жагсаалт

> Эх сурвалж: *Clean Code: A Handbook of Agile Software Craftsmanship* — Robert C. Martin (Uncle Bob).
> Бүлэг 1–13-ийн үндсэн зарчмууд (номын жишээ кодтой) + Бүлэг 17 "Smells and Heuristics"-ийн бүрэн 66 дүрэм.

---

## Үндсэн зарчмууд (Бүлэг 1–13)

### Нэрлэлт (Бүлэг 2)

- **Санаагаа илэрхийлсэн нэр** — нэр нь *яагаад байгаа, юу хийдэг, яаж хэрэглэгддэг* гэдгээ хэлж чадвал тайлбар хэрэггүй болно:

  ```java
  int d;                    // elapsed time in days — тайлбар шаардаж байна = нэр муу
  int elapsedTimeInDays;    // нэр өөрөө бүгдийг хэлнэ
  ```

- Нэр солиход л код ойлгомжтой болдгийн номын жишээ — логик, бүтэц огт өөрчлөгдөөгүй:

  ```java
  // Өмнө: юу хийдэг нь огт мэдэгдэхгүй
  public List<int[]> getThem() {
    List<int[]> list1 = new ArrayList<int[]>();
    for (int[] x : theList)
      if (x[0] == 4) list1.add(x);
    return list1;
  }
  // Дараа: minesweeper-ийн туг тавьсан нүднүүдийг олдог нь ил боллоо
  public List<Cell> getFlaggedCells() {
    List<Cell> flaggedCells = new ArrayList<Cell>();
    for (Cell cell : gameBoard)
      if (cell.isFlagged()) flaggedCells.add(cell);
    return flaggedCells;
  }
  ```

- **Худал мэдээлэл бүү өг**: `List` биш юмыг `accountList` гэж бүү нэрлэ; жижиг ялгаатай урт нэрүүд (`XYZControllerForEfficientHandling…` vs `…Storage…`); `l` ба `O` хувьсагч (1, 0-тэй андуурагдана).
- Нэг ойлголтод нэг л үг (`get`/`fetch`/`retrieve` хольж болохгүй); нэг үгийг хоёр өөр утгаар бүү хэрэглэ (pun).
- Class = нэр үг, method = үйл үг; дуудаж хэлж болохуйц, хайлтад олдохуйц нэр; encoding (Hungarian, `m_`) хэрэггүй.

### Функц (Бүлэг 3)

- **Жижиг байх ёстой** — дараа нь бүр жижиг болго; блок нэг мөр (нэрлэсэн функцийн дуудлага) байвал сайн.
- **Нэг л зүйл хий**, нэг түвшний abstraction дээр; дээрээс доош "сонин шиг" уншигдана.
- **Аргументын тоо**: 0 (niladic) хамгийн сайн → 1 → 2 → 3-аас олон бол онцгой үндэслэл шаардана — тэгээд ч бүү хэрэглэ. Аргумент бүр ойлголтын ачаалал, тестийн хослолыг өсгөдөг.
- Нэг аргументтэй функцийн зөв хэлбэрүүд: асуулт (`boolean fileExists("MyFile")`), хувиргалт (`InputStream fileOpen("MyFile")`), эсвэл event. Хувиргалтын үр дүнг **return value-гаар** гарга — output аргументаар биш.
- **Flag аргумент = функц хоёр зүйл хийж байна**:

  ```java
  render(true)                              // юу гэсэн үг вэ? — салга:
  renderForSuite();  renderForSingleTest();
  ```

- Side-effect бүү нуу; Command-Query салгалт: өөрчилдөг эсвэл асуудаг — хоёуланг нь нэг дор биш.
- DRY — давхардлыг устга.

### Тайлбар (Бүлэг 4)

- Тайлбар муу кодыг нөхөхгүй — **кодоороо тайлбарла**; тайлбар шаардсан газар бүр нэр/бүтцээ сайжруулах боломж.
- Зөвшөөрөгдөх: хууль эрх зүй, санаа/шалтгааны тайлбар, анхааруулга, TODO, public API-ийн Javadoc.
- Муу: давхардсан (`i++; // increment i`), хуучирсан, journal/зохиогчийн тэмдэглэл (git-ийн ажил), position marker, **comment хийсэн код — шууд устга, git санаж байгаа**.

### Формат (Бүлэг 5)

- Сонины нийтлэл шиг: дээрээс доош, ерөнхийгөөс дэлгэрэнгүй рүү.
- Хамааралтай зүйлс босоо ойрхон: хувьсагчийг хэрэглэх газарт нь зарла, дуудагч функц дуудагдагчийнхаа дээр байг.
- Багаараа нэг стандарт мөрдө — хаана хаалт тавих нь чухал биш, бүгд нэг газар тавьдаг нь чухал.

### Objects ба өгөгдлийн бүтэц (Бүлэг 6)

- Object = өгөгдлөө нууж үйлдэл ил гаргана; data structure = өгөгдөл ил, үйлдэлгүй. Хоёуланг нь хольсон hybrid бүү хий.
- Law of Demeter: зөвхөн шууд хамтрагчийнхаа method-ыг дууд — "train wreck" бүү үүсгэ:

  ```java
  final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath(); // муу
  ```

### Алдааны боловсруулалт (Бүлэг 7)

- **Error code биш exception** — алгоритм ба алдааны боловсруулалт хоёр орооцолдсон санаа зовнил байсныг салгана:

  ```java
  public void sendShutDown() {
    try {
      tryToShutDown();                  // цэвэр алгоритм
    } catch (DeviceShutDownError e) {
      logger.log(e);                    // цэвэр error handling
    }
  }
  ```

- **try-catch-finally-гаа эхэлж бич** — try блок бол transaction: catch нь ямар ч юм болсон системийг зөв төлөвт үлдээх ёстой. Exception шидүүлдэг тестээ түрүүлж бич.
- Unchecked exception хэрэглэ (checked нь Open/Closed-ийг зөрчиж, гарын үсэг бүрийг өөрчлөх cascade үүсгэдэг); exception-д хангалттай context өг; caller-ийн хэрэгцээгээр exception class тодорхойл.
- **null бүү буцаа** — нэг л мартагдсан null шалгалт системийг унагана. Exception эсвэл SPECIAL CASE объект буцаа:

  ```java
  // Өмнө:
  List<Employee> employees = getEmployees();
  if (employees != null)
    for (Employee e : employees) totalPay += e.getPay();
  // Дараа: getEmployees() хоосон үед Collections.emptyList() буцаадаг болгоход:
  for (Employee e : getEmployees()) totalPay += e.getPay();
  ```

- **null бүү дамжуул** — null буцаахаас ч дор; аргумент дахь null = алдааны шинж гэж тооц.

### Хил хязгаар (Бүлэг 8)

- Гуравдагч талын кодыг wrapper-аар тусгаарла — interface нь өөрчлөгдөхөд нэг л газар засна.
- **Learning test** бич — гадаад library-ийн зан төлөвийг тестээр судалж, ойлголтоо баримтжуул; хувилбар шинэчлэхэд тест нь эвдрэл илрүүлнэ.

### Тест (Бүлэг 9)

- Тестийн код = production кодтой адил цэвэр байх ёстой. Бохир тест = тест байхгүйгээс дор (өөрчлөлт бүрд эвдэрч, эцэст нь хаягддаг).
- **F.I.R.S.T**: **F**ast (удаан бол ажиллуулахаа болино), **I**ndependent (дараалалаас хамаарахгүй), **R**epeatable (ямар ч орчинд), **S**elf-validating (boolean үр дүн — гараар лог шалгахгүй), **T**imely (production кодоос өмнө).
- Нэг тест — нэг ойлголт; BUILD-OPERATE-CHECK бүтэцтэй, domain-specific туслах функцүүдээр уншигдахуйц.

### Class (Бүлэг 10)

- Жижиг байх; хэмжүүр нь мөр биш **хариуцлага**. Нэрийг нь 25 үгэнд "if", "and", "or", "but"-гүй тайлбарлаж чадахгүй бол хэт том.
- **Single Responsibility**: өөрчлөгдөх ганц шалтгаантай; cohesion өндөр — method бүр олон instance хувьсагч хэрэглэдэг байх тусмаа сайн.
- Өөрчлөлтөөс тусгаарла — concrete биш abstraction-аас хамаар (Dependency Inversion).

### Boy Scout Rule

> Кодыг олсноосоо цэвэрхэн үлдээ.

---

## Бүлэг 17: Smells and Heuristics — бүрэн жагсаалт

### Тайлбар (Comments)

| # | Дүрэм | Тайлбар |
|---|-------|---------|
| C1 | Inappropriate Information | Өөрчлөлтийн түүх, зохиогч, огноо г.м. метадата тайлбарт бүү хий — git/issue tracker-ийн ажил. |
| C2 | Obsolete Comment | Хуучирсан тайлбарыг шинэчил эсвэл устга — код руугаа "нүүж" холдоод төөрөгдүүлдэг. |
| C3 | Redundant Comment | Код өөрөө хэлж байгааг давтсан тайлбар (`i++; // increment i`) бүү бич. Тайлбар зөвхөн кодын хэлж *чадахгүйг* л хэлнэ. |
| C4 | Poorly Written Comment | Бичих гэж байгаа бол сайн бич: товч, зөв, илэрхий зүйлийг давтахгүй. |
| C5 | Commented-Out Code | Устга. Git санаж байгаа. |

### Орчин (Environment)

| # | Дүрэм | Тайлбар |
|---|-------|---------|
| E1 | Build Requires More Than One Step | Build нэг л энгийн командаар. |
| E2 | Tests Require More Than One Step | Бүх тест нэг команд/нэг товчоор. |

### Функц (Functions)

| # | Дүрэм | Тайлбар |
|---|-------|---------|
| F1 | Too Many Arguments | 0 хамгийн сайн; 3-аас олон бол зайлсхий. |
| F2 | Output Arguments | Аргумент = input гэж уншигч хүлээдэг. Төлөв өөрчлөх бол дуудагдсан объектоо өөрчил. |
| F3 | Flag Arguments | Boolean аргумент = хоёр зүйл хийж байна → хоёр функц болго. |
| F4 | Dead Function | Хэзээ ч дуудагддаггүй функцийг устга. |

### Ерөнхий (General)

| # | Дүрэм | Тайлбар |
|---|-------|---------|
| G1 | Multiple Languages in One Source File | Нэг файлд аль болох нэг хэл. |
| G2 | Obvious Behavior Is Unimplemented | Least Surprise: `StringToDay("Monday")` бол `"monday"`, `"Mon"` ч ажиллана гэж уншигч хүлээнэ — хүлээлтийг нь хангаагүй код итгэл алдуулна. |
| G3 | Incorrect Behavior at the Boundaries | Зөн совиндоо бүү найд — хилийн нөхцөл болгонд тест бич. |
| G4 | Overridden Safeties | Warning унтраах, failing тест ignore хийх = Чернобыль. |
| G5 | Duplication | Номын хамгийн чухал дүрмийн нэг. Давхардал бүр = алдагдсан abstraction. Ил хуулбар → функц; давтагдсан if/switch → polymorphism; ижил алгоритм → Template Method / Strategy. |
| G6 | Code at Wrong Level of Abstraction | Өндөр түвшний ойлголт base-д, доод түвшнийх derivative-д; салгалт бүрэн бай. `Stack` interface-д `percentFull()` байж болохгүй — бүх stack дүүргэлтээ мэддэггүй → `BoundedStack`-д. |
| G7 | Base Classes Depending on Their Derivatives | Base class derivative-уудаа мэдэхгүй байх ёстой. |
| G8 | Too Much Information | Interface жижиг байлга: цөөн method, цөөн хувьсагч. Өгөгдөл, туслах функц, тогтмолоо нуу — coupling багасна. |
| G9 | Dead Code | Хэзээ ч биелдэггүй код — "ёсоор нь оршуул". |
| G10 | Vertical Separation | Хувьсагч/функцийг хэрэглэдэг газартаа ойрхон байрлуул. |
| G11 | Inconsistency | Нэг зүйлийг нэг маягаар хийсэн бол ижил бүхнийг тэр маягаар (`response` гэж нэрлэсэн бол хаа сайгүй; `processVerificationRequest` бол `processDeletionRequest`). |
| G12 | Clutter | Хоосон constructor, хэрэглэгдээгүй хувьсагч, утгагүй тайлбар — цэвэрлэ. |
| G13 | Artificial Coupling | Ерөнхий enum/static-ийг тодорхой class дотор бүү хий — "түр тохиромжтой" газарт хаясан зүйл хиймэл хамаарал үүсгэнэ. |
| G14 | Feature Envy | Method өөр class-ын getter/setter-ээр өгөгдлийг нь ухаж байвал тэр class-д "атаархаж" байна — логикийг өгөгдөлтэй нь ойртуул (тайлан формат гэх мэт зайлшгүй тохиолдол бий). |
| G15 | Selector Arguments | Behavior сонгодог аргумент (bool, enum, int) = олон функцийг нэгд шахсан залхуурал. |
| G16 | Obscured Intent | Нэг мөрт шахсан илэрхийлэл, Hungarian, magic number санааг нуудаг. |
| G17 | Misplaced Responsibility | Кодыг уншигч зүй ёсоор хайх газарт байрлуул: `PI` — тригонометрийн функцүүдийн хажууд; нийт цагийг тооцох функц нэрээрээ илэрхий газраа байг. |
| G18 | Inappropriate Static | Эргэлзвэл non-static. Polymorphic болох магадлалтай бол (`calculatePay`) хэзээ ч static бүү хий; `Math.max` шиг нь зүгээр. |
| G19 | Use Explanatory Variables | Тооцооллыг нэртэй завсрын хувьсагчдад хуваа — хэт их хийх бараг боломжгүй: |
| G20 | Function Names Should Say What They Do | `date.add(5)` — өдөр? долоо хоног? өөрчилдөг үү? → `addDaysTo` эсвэл `daysLater`. Хэрэгжилтийг нь харж байж ойлгодог нэр бол нэрээ соль. |
| G21 | Understand the Algorithm | "Тест давлаа" ≠ "зөв гэдгийг мэднэ". If болон флагаар нухаж "ажиллуулсан" код бүү үлдээ — ойлгомжтой болтол refactor хий. |
| G22 | Make Logical Dependencies Physical | Далд таамаглал бүү хий — `PAGE_SIZE`-ийг reporter мэдэх биш, formatter-аас `getMaxPageSize()`-ээр асуу. |
| G23 | Prefer Polymorphism to If/Else or Switch/Case | ONE SWITCH дүрэм: нэг төрлийн сонголтод нэг л switch; тэр нь polymorphic объект үүсгэдэг байх ёстой. |
| G24 | Follow Standard Conventions | Багийн стандартыг бүгд мөрдө — жишээ нь код өөрөө. |
| G25 | Replace Magic Numbers with Named Constants | `86400` → `SECONDS_PER_DAY`. Тоо төдийгүй өөрийгөө тайлбарлахгүй ямар ч утга: `assertEquals(7777, Employee.find("John Doe")…)` → `HOURLY_EMPLOYEE_ID`, `HOURLY_EMPLOYEE_NAME`. (Харин `radius * Math.PI * 2`-ын `2`-ыг `TWO` болгох нь утгагүй.) |
| G26 | Be Precise | Мөнгөнд float, магадгүй-давхардахгүй-гэсэн query, lock-гүй concurrent update — залхуурал. Null буцааж болдог функц дуудвал null шалга. |
| G27 | Structure over Convention | Албаддаг бүтэц > найддаг convention: abstract method-той base class > сайхан нэрлэсэн switch (хэн ч ижил хэрэгжүүлэхийг албадахгүй). |
| G28 | Encapsulate Conditionals | `if (shouldBeDeleted(timer))` > `if (timer.hasExpired() && !timer.isRecurrent())`. |
| G29 | Avoid Negative Conditionals | `if (buffer.shouldCompact())` > `if (!buffer.shouldNotCompact())`. |
| G30 | Functions Should Do One Thing | Хэд хэдэн үйлдлийн цуврал → жижиг функцүүдэд задал (доорх жишээ). |
| G31 | Hidden Temporal Couplings | Дуудах дараалал чухал бол "bucket brigade"-аар ил гарга (доорх жишээ). |
| G32 | Don't Be Arbitrary | Бүтэц болгонд шалтгаан байж, шалтгаан нь бүтцээрээ харагдаг бай. Дур зоргын бүтцийг бусад нь дуртайгаараа өөрчилнө. |
| G33 | Encapsulate Boundary Conditions | `+1`/`-1`-үүдийг код даяар бүү тарaa — `int nextLevel = level + 1;` гэж нэг газар барь. |
| G34 | Functions Should Descend Only One Level of Abstraction | Функцийн мөрүүд бүгд нэрнээсээ яг нэг түвшин доор бай. HTML tag угсрах, hr-ийн хэмжээ тооцох хоёр нэг функцэд байж болохгүй. |
| G35 | Keep Configurable Data at High Levels | Default/config утгууд өндөр түвшинд, доош аргументаар дамжина — доод түвшин утгыг нь "эзэмшихгүй". |
| G36 | Avoid Transitive Navigation | Law of Demeter: `a.getB().getC().doSomething()` бүү хий — дунд нь Q оруулах болоход бүх хэрэглээг засна. Шууд хамтрагч чинь хэрэгтэй үйлчилгээгээ өөрөө санал болгог. |

**Түлхүүр жишээнүүд (номоос):**

```java
// G19 — Explanatory variables (FitNesse):
Matcher match = headerPattern.matcher(line);
if (match.find()) {
  String key = match.group(1);      // эхний бүлэг = key гэдэг нь
  String value = match.group(2);    // нэрнээсээ л ойлгогдоно
  headers.put(key.toLowerCase(), value);
}

// G30 — Do One Thing: гурван үйлдэлтэй функцийг задлав
public void pay() {
  for (Employee e : employees)
    payIfNecessary(e);
}
private void payIfNecessary(Employee e) {
  if (e.isPayday()) calculateAndDeliverPay(e);
}
private void calculateAndDeliverPay(Employee e) {
  Money pay = e.calculatePay();
  e.deliverPay(pay);
}

// G31 — Temporal coupling-ийг ил гаргах: үр дүн нь дараагийнхын аргумент
// болохоор буруу дарааллаар дуудах аргагүй болно
public void dive(String reason) {
  Gradient gradient = saturateGradient();
  List<Spline> splines = reticulateSplines(gradient);
  diveForMoog(splines, reason);
}

// G15 — Selector argument-ийг задлах
public int calculateWeeklyPay(boolean overtime) { ... }   // муу: calculateWeeklyPay(false) юу гэсэн үг?
public int straightPay() { ... }                          // сайн: тус тусдаа
public int overTimePay() { ... }
```

### Java

| # | Дүрэм | Тайлбар |
|---|-------|---------|
| J1 | Avoid Long Import Lists by Using Wildcards | Нэг package-аас 2+ class бол `import package.*`. *(Анхаар: орчин үеийн практикт ихэнх баг эсрэгээр explicit import + IDE-ийн автомат удирдлагыг илүүд үздэг.)* |
| J2 | Don't Inherit Constants | Тогтмол авах гэж interface бүү implement хий (`implements PayrollConstants` — тогтмол өвлөлтийн оройд нуугдана) — `import static PayrollConstants.*;` хэрэглэ. |
| J3 | Constants versus Enums | `public static final int`-ийн оронд enum — нэртэй, бас method/field-тэй байж чадна (`HourlyPayGrade.APPRENTICE.rate()`). |

### Нэрлэлт (Names)

| # | Дүрэм | Тайлбар |
|---|-------|---------|
| N1 | Choose Descriptive Names | Нэр = кодын уншигдах чанарын 90%. Bowling жишээ: `x()`, `q`, `z`, `l[z]` → `score()`, `frame`, `isStrike(frame)` — нэрнээс нь `isStrike`-ийн хэрэгжилтийг хүртэл таамаглаж чадна. |
| N2 | Choose Names at the Appropriate Level of Abstraction | Хэрэгжилт биш abstraction-ий түвшний нэр: modem бүр залгадаггүй → `dial(phoneNumber)` биш `connect(connectionLocator)`. |
| N3 | Use Standard Nomenclature Where Possible | Pattern-ий нэр (`AutoHangupModemDecorator`), хэлний convention (`toString`), төслийн ubiquitous language. |
| N4 | Unambiguous Names | `doRename` (дотор нь бас `renamePage` бий!) → `renamePageAndOptionallyAllReferences` — урт ч нэг л газраас дуудагддаг тул тодорхой нь дийлнэ. |
| N5 | Use Long Names for Long Scopes | 5 мөрийн loop-д `i` төгс; scope урт бол нэр урт, нарийн. |
| N6 | Avoid Encodings | `m_`, `f`, `vis_` — орчин үеийн хэрэгсэл өөрөө харуулна; Hungarian бохирдолгүй бай. |
| N7 | Names Should Describe Side-Effects | Lazy-init хийдэг `getOos()` нь "get"-ээс илүүг хийж байна → `createOrReturnOos()`. |

### Тест (Tests)

| # | Дүрэм | Тайлбар |
|---|-------|---------|
| T1 | Insufficient Tests | "Хангалттай юм шиг" биш — эвдэрч болох бүхнийг шалга. |
| T2 | Use a Coverage Tool! | Тестлэгдээгүй if/catch-уудыг нүдэнд харуулна. |
| T3 | Don't Skip Trivial Tests | Бичихэд хялбар, баримтжуулах үнэ цэнэ нь өртгөөсөө өндөр. |
| T4 | An Ignored Test Is a Question about an Ambiguity | Шаардлага тодорхойгүй бол `@Ignore` тест = баримтжуулсан асуулт. |
| T5 | Test Boundary Conditions | Алгоритмын дундыг зөв хийчихээд хилийг нь алддаг. |
| T6 | Exhaustively Test Near Bugs | Bug-ууд бөөгнөрдөг — нэг нь олдсон функцийг бүрэн тестлэ. |
| T7 | Patterns of Failure Are Revealing | Уналтын хэв маяг оношийг хэлдэг ("5-аас урт оролт бүгд унадаг") — тестээ бүрэн, эмх цэгцтэй байлга. |
| T8 | Test Coverage Patterns Can Be Revealing | Давсан тестүүдийн ажиллуулсан/ажиллуулаагүй код нь унасан тестийн шалтгааныг хэлж өгдөг. |
| T9 | Tests Should Be Fast | Удаан тест = цаг давчдахад хамгийн түрүүнд хасагдаж, ажиллуулагдахаа больдог тест. |

---

## Дүгнэлт (номын үг)

> "Clean code is not written by following a set of rules. You don't become a software craftsman by learning a list of heuristics. Professionalism and craftsmanship come from values that drive disciplines."

Цэвэр код дүрэм цээжилснээр биш — эдгээр дүрмийн ард буй **үнэт зүйлсийг** сахилга батаар хэрэгжүүлснээр бичигдэнэ. Энэ жагсаалт бүрэн гүйцэд биш — гэхдээ **үнэт зүйлсийн систем**-ийг илэрхийлдэг нь чухал.
