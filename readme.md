# db-presets

Тулза для работы с пресетами (то бишь дампами) PostgreSQL.
Хранит пресеты на Amazon S3.
Поддерживает лок объектов на запись.
Хранит историю изменений объекта.

## Требования

* Linux
* xz
* PostgreSQL
* Node.js >= 10.15.3
* /opt с установленным приложением.
* Для работы обязательно проставить переменные окружения.

## Установка

`npm i -g db-presets`

В системе появляется тулза `db-p`.

`db-p -h`

## [Переменные окружения](docs/env-vars.md)

## [Сценарии использования](docs/use-cases.md)

## Рекомендации

* Делать пресеты нужно на релизных ветках, чтобы на них всегда можно было накатить миграции от тестовой ветки,
или от новых веток.

* В каждой релизной ветке будет свой набор пресетов. Допускается, чтобы пресет создавался от пресета старой ветки накатом
миграций с новой ветки.

* В пресетах должны быть только необходимые данные.
  Т.к. с большими пресетами снизится скорость работы и увеличиться плата за S3.

* Название пресета должно быть информативным. Чтобы и тестировщики понимали какой пресет использовать для тестов,
и те, кто добавляет данные в пресеты, понимали от какого пресета имеет смысл отталкиваться.

* Нужны универсальные пресеты, которые будут использоваться для большинства тестов, и специфические пресеты, для тестирования частностей.

* Если непонятно название сущности, которую кто-то создал, можете улучшить название, и поменять название в автотестах
и тест кейсах.

* Если автотестописателю непонятно название сущности, можно поменять это название и пересохранить пресет.
Принцип скаута и рефакторинги работают и здесь.

* По-возможности, названия и свойства сущностей в БД должно быть на английском языке,
чтобы было меньше различий между английской и русской версиями приложения.

* Имена сущностей должно быть информативными.
Смысл такой: у каждого писателя тескейсов должно быть понимание какие сущности он может юзать для своих кейсов.
Если там device1, user1, host1, то писатель не поймет что это, и сделает свои user2, host2, и т.д., и будет мусорка.

## Начало работы. Создание корзины на S3, создание и сохранение пресетов

* На Amazon S3 создаем хранилище типа
https://aws.amazon.com/s3/storage-classes/?nc=sn&loc=3#Infrequent_access.

* Создаем ключи шифрования.

* Запускаем приложение с нужным пресетом (м.б. с пустым), работаем с приложением, заполняя нужный пресет.

* Придумываем имя пресету, и сохраняем его в Amazon S3.

* И так мы создаем несколько пресетов.

## Воркфлоу для ручного тестирования

* Стягиваете на тестовую машину семейство нужных пресетов (делается одной командой).

* Устанавливаете один нужный пресет.

* Тестируете.

* Устанавливаете другой пресет.

* Тестируете. И т.д.

## Воркфлоу для автотестов

* В CI систему, перед запуском автотестов вставляем скрипт, стягивающий семейство нужных пресетов 

* Используя CMD Line или API - подменяете пресеты и рестартуете приложение прямо из тестов.

## Если с пресетом накосячили

Можно зайти на Amazon S3 и восстановить пресет из бэкапов
(хранятся 10 дней, создаются каждый раз при обновлении существующего пресета).
