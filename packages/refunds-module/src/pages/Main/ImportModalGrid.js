import React, { Component } from "react";
import {
  Card,
  Table,
  Icon,
  Menu,
  Dropdown,
  Button,
  Label,
  Pagination,
  Row,
  Col,
  Form,
  Modal,
  Input,
  DatePicker,
  LocaleProvider,
  Select,
  Checkbox,
  Divider,
  Spin
} from "antd";
import SmartGridView from "../../components/SmartGridView";
import formatMessage from "../../utils/formatMessage";
import connect from "../../Redux";

class ImportModalGrid extends Component {
  state = {

    isChangedColumn: false,

    columns: [
      {
        "title": "Номер заявки",
        "isVisible": true,
        width: 120,
        "dataIndex": "applicationId.appNumber"

      },
      {
        "title": "Дата заявления плательщика",
        "isVisible": true,
        width: 150,
        "dataIndex": "appPayerDate"

      },
      {
        "title": "Дата заявки",
        "isVisible": true,
        width: 120,
        "dataIndex": "applicationId.appDate"

      },
      {
        "title": "Дата поступления заявления в Фонд",
        "isVisible": true,
        width: 150,
        "dataIndex": "receiptAppdateToFsms"

      },
      {
        "title": "Дата поступления",
        "isVisible": true,
        width: 120,
        "dataIndex": "entryDate"

      },
      {
        "title": "Крайняя дата исполнения заявки",
        "isVisible": true,
        width: 200,
        "dataIndex": "appEndDate"

      },
      {
        "title": "Сумма возврата",
        "isVisible": true,
        width: 120,
        "dataIndex": "refundPayAmount"

      },
      {
        "title": "Референс ГК",
        "isVisible": true,
        width: 200,
        "dataIndex": "gcvpReference"

      },
      {
        "title": "Номер плат-го поручения ГК",
        "isVisible": true,
        width: 300,
        "dataIndex": "gcvpOrderNum"

      },
      {
        "title": "Дата плат-го поручения ГК",
        width: 300,
        "dataIndex": "gcvpOrderDate"
      },
      {
        "title": "Причина возврата",
        "dataIndex": "drefundReasonId.nameRu",
        width: 150

      },
      {
        "title": "ИИН Потребителя",
        width: 150,
        "dataIndex": "personIin"
      },
      {
        "title": "КНП",
        width: 150,
        "dataIndex": "applicationId.dknpId.code"

      },
      {
        "title": "Номер платежного поручения",
        width: 150,
        "dataIndex": "applicationId.payOrderNum"

      },
      {
        "title": "Дата платежного поручения",
        width: 150,
        "dataIndex": "applicationId.payOrderDate"

      },
      {
        "title": "Сумма отчислений",
        width: 150,
        "dataIndex": "payAmount"
      },
      {
        "title": "Дата последнего взноса",
        width: 150,
        "dataIndex": "lastPayDate"

      },
      {
        "title": "Дата осуществления возврата",
        "dataIndex": "refundDate",
        width: 150

      },
      {
        "title": "Кол-во отчислений и (или) взносов за последние 12 календарных месяцев",
        "dataIndex": "lastMedcarePayCount",
        width: 150

      },
      {
        "title": "Статус страхования",
        width: 150,
        "dataIndex": "medinsStatus"
      },
      {
        "title": "Референс",
        width: 200,
        "dataIndex": "applicationId.reference"

      },
      {
        "title": "Причина отказа",
        width: 150,
        "dataIndex": "ddenyReasonId.nameRu"
      },
      {
        "title": "Отчет об отказе",
        "dataIndex": "refundStatus",
        width: 150

      },
      {
        "title": "Осталось дней",
        width: 150,
        "dataIndex": "daysLeft"
      },
      {
        "title": "Дата изменения статуса заявки",
        "dataIndex": "changeDate",
        width: 150

      },
      {
        "title": "Период",
        width: 150,
        "dataIndex": "payPeriod"
      },
      {
        "title": "Веб-сервис (сообщение) ",
        "dataIndex": "wsStatusMessage",
        width: 150

      }
    ],
    dataSource: [
      {
        "isRefundConfirm": false,
        "refundDocumentList": null,
        "refundPayAmount": 2569,
        "personPatronname": "Ивановна",
        "lastPayDate": "01.05.2016",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.44",
        "medinsStatus": null,
        "personSurname": "Михеева",
        "gcvpOrderNum": "35312",
        "personFirstname": "Александра",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "dad6b8fa-cc3a-48f6-b916-88e6c2bb140b",
          "reference": "9DF01A9522",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "8753",
          "appNumber": "98B3",
          "appEndDate": "27.12.2018",
          "appDate": "28.11.2018",
          "receiptAppdateToFsms": "20.12.2018",
          "payOrderDate": "28.11.2018",
          "refundCount": 5
        },
        "personIin": "784033048790",
        "entryDate": "28.11.2018",
        "appPayerDate": "03.05.2016",
        "id": "0337596f-5afb-4961-a8ca-009a6248df50",
        "refundEntryDate": "28.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Излишне начислены на работников",
          "nameKz": null,
          "shortname": "Излишне начислены на работников",
          "code": "00112",
          "id": "eccff8d7-7a83-402c-b4fd-0bde630f1c72"
        },
        "refundDate": "28.11.2018",
        "appEndDate": "27.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "77A3FF1162D1625",
        "receiptAppdateToFsms": "20.12.2018",
        "gcvpOrderDate": "06.05.2016",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Неверно указаны реквизиты платежа",
          "nameRu": "Неверно указаны реквизиты платежа",
          "nameKz": "Неверно указаны реквизиты платежа",
          "shortname": "Неверно указаны реквизиты платежа",
          "code": "3",
          "id": "2bd882a3-9723-4bb9-9c67-d22397603007"
        },
        "dappRefundStatusId": {
          "nameRu": "Обработано - отказано",
          "nameKz": null,
          "shortname": "Обработано - отказано",
          "code": "00004",
          "id": "b5597600-66f8-47d9-89d2-f3a12b7825d9"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": false,
        "refundDocumentList": null,
        "refundPayAmount": 2426.34,
        "personPatronname": "Викторович",
        "lastPayDate": "29.11.2014",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.52",
        "medinsStatus": null,
        "personSurname": "Копылов",
        "gcvpOrderNum": "68796",
        "personFirstname": "Юрий",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "dad6b8fa-cc3a-48f6-b916-88e6c2bb140b",
          "reference": "9DF01A9522",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "8753",
          "appNumber": "98B3",
          "appEndDate": "27.12.2018",
          "appDate": "28.11.2018",
          "receiptAppdateToFsms": "20.12.2018",
          "payOrderDate": "28.11.2018",
          "refundCount": 5
        },
        "personIin": "140828000308",
        "entryDate": "28.11.2018",
        "appPayerDate": "01.12.2014",
        "id": "f8d285e9-a2b1-44a3-84b1-009a8f05772d",
        "refundEntryDate": "28.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Излишне начислены на работников",
          "nameKz": null,
          "shortname": "Излишне начислены на работников",
          "code": "00112",
          "id": "c84fd389-2cd9-44fc-93ff-1313aa068f50"
        },
        "refundDate": "28.11.2018",
        "appEndDate": "27.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "8BB5B7607455387",
        "receiptAppdateToFsms": "20.12.2018",
        "gcvpOrderDate": "04.12.2014",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Неверно указаны реквизиты платежа",
          "nameRu": "Неверно указаны реквизиты платежа",
          "nameKz": "Неверно указаны реквизиты платежа",
          "shortname": "Неверно указаны реквизиты платежа",
          "code": "3",
          "id": "2bd882a3-9723-4bb9-9c67-d22397603007"
        },
        "dappRefundStatusId": {
          "nameRu": "Обработано - отказано",
          "nameKz": null,
          "shortname": "Обработано - отказано",
          "code": "00004",
          "id": "b5597600-66f8-47d9-89d2-f3a12b7825d9"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": true,
        "refundDocumentList": null,
        "refundPayAmount": 2711.65,
        "personPatronname": "Александрович",
        "lastPayDate": "30.09.2016",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.37",
        "medinsStatus": null,
        "personSurname": "Смоленков",
        "gcvpOrderNum": "72273",
        "personFirstname": "Сергей",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "dad6b8fa-cc3a-48f6-b916-88e6c2bb140b",
          "reference": "9DF01A9522",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "8753",
          "appNumber": "98B3",
          "appEndDate": "27.12.2018",
          "appDate": "28.11.2018",
          "receiptAppdateToFsms": "20.12.2018",
          "payOrderDate": "28.11.2018",
          "refundCount": 5
        },
        "personIin": "520823000325",
        "entryDate": "28.11.2018",
        "appPayerDate": "02.10.2016",
        "id": "9ff03dc6-57ef-45ef-9f75-009943b3e2ea",
        "refundEntryDate": "28.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Ошибочно перечислены",
          "nameKz": null,
          "shortname": "Ошибочно перечислены",
          "code": "00111",
          "id": "76ea6966-7fa2-4e5c-9f61-e370a5249334"
        },
        "refundDate": "28.11.2018",
        "appEndDate": "27.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "605F19D59C229E1",
        "receiptAppdateToFsms": "20.12.2018",
        "gcvpOrderDate": "05.10.2016",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": { "nameRu": null, "nameKz": null, "code": null, "id": null },
        "dappRefundStatusId": {
          "nameRu": "Обработано-одобрено",
          "nameKz": null,
          "shortname": "Обработано-одобрено",
          "code": "00003",
          "id": "7db41225-e75a-4e72-8ea2-44bad4d1d8b5"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": true,
        "refundDocumentList": null,
        "refundPayAmount": 2283.67,
        "personPatronname": "Валерьевна",
        "lastPayDate": "15.06.2018",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.59",
        "medinsStatus": null,
        "personSurname": "Филиппова",
        "gcvpOrderNum": "43412",
        "personFirstname": "Юлия",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "dad6b8fa-cc3a-48f6-b916-88e6c2bb140b",
          "reference": "9DF01A9522",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "8753",
          "appNumber": "98B3",
          "appEndDate": "27.12.2018",
          "appDate": "28.11.2018",
          "receiptAppdateToFsms": "20.12.2018",
          "payOrderDate": "28.11.2018",
          "refundCount": 5
        },
        "personIin": "130886000242",
        "entryDate": "28.11.2018",
        "appPayerDate": "17.06.2018",
        "id": "9dc96cc5-cf66-48e1-a3e4-009b2ffdba89",
        "refundEntryDate": "28.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Неверно указан код назначения платежа",
          "nameKz": null,
          "shortname": "Неверно указан код назначения платежа",
          "code": "00113",
          "id": "2dea5963-fa29-4cdb-9c70-24fa18b53094"
        },
        "refundDate": "28.11.2018",
        "appEndDate": "27.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "EAEA95F7BDF7658",
        "receiptAppdateToFsms": "20.12.2018",
        "gcvpOrderDate": "20.06.2018",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": { "nameRu": null, "nameKz": null, "code": null, "id": null },
        "dappRefundStatusId": {
          "nameRu": "Обработано-одобрено",
          "nameKz": null,
          "shortname": "Обработано-одобрено",
          "code": "00003",
          "id": "7db41225-e75a-4e72-8ea2-44bad4d1d8b5"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": true,
        "refundDocumentList": null,
        "refundPayAmount": 2854.67,
        "personPatronname": "Садыковна",
        "lastPayDate": "17.02.2015",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.67",
        "medinsStatus": null,
        "personSurname": "Гильманова",
        "gcvpOrderNum": "67226",
        "personFirstname": "Фарида",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "dad6b8fa-cc3a-48f6-b916-88e6c2bb140b",
          "reference": "9DF01A9522",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "8753",
          "appNumber": "98B3",
          "appEndDate": "27.12.2018",
          "appDate": "28.11.2018",
          "receiptAppdateToFsms": "20.12.2018",
          "payOrderDate": "28.11.2018",
          "refundCount": 5
        },
        "personIin": "830870000304",
        "entryDate": "28.11.2018",
        "appPayerDate": "19.02.2015",
        "id": "3dd9565f-4ece-49f6-88ae-009c84a5a7f5",
        "refundEntryDate": "28.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Ошибочно перечислены",
          "nameKz": null,
          "shortname": "Ошибочно перечислены",
          "code": "00111",
          "id": "bca52ced-f66b-4c33-afef-468f5adf545f"
        },
        "refundDate": "28.11.2018",
        "appEndDate": "27.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "9A9A561D1977E75",
        "receiptAppdateToFsms": "20.12.2018",
        "gcvpOrderDate": "22.02.2015",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": { "nameRu": null, "nameKz": null, "code": null, "id": null },
        "dappRefundStatusId": {
          "nameRu": "Обработано-одобрено",
          "nameKz": null,
          "shortname": "Обработано-одобрено",
          "code": "00003",
          "id": "7db41225-e75a-4e72-8ea2-44bad4d1d8b5"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": false,
        "refundDocumentList": null,
        "refundPayAmount": 2711.65,
        "personPatronname": "Наилевна",
        "lastPayDate": "29.07.2015",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.37",
        "medinsStatus": null,
        "personSurname": "Рахимзянова",
        "gcvpOrderNum": "40700",
        "personFirstname": "Гульнара",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "b15230ac-48e3-46cf-9e4e-c8e72aa7e429",
          "reference": "8D51A1D450",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "0D77",
          "appNumber": "4C78",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "710892000475",
        "entryDate": "22.11.2018",
        "appPayerDate": "31.07.2015",
        "id": "c5264224-153b-44d7-9943-00963950d73f",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Ошибочно перечислены",
          "nameKz": null,
          "shortname": "Ошибочно перечислены",
          "code": "00111",
          "id": "76ea6966-7fa2-4e5c-9f61-e370a5249334"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "605F19D59C229E1",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "03.08.2015",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Частичный возврат по одному участнику",
          "nameRu": "Частичный возврат по одному участнику",
          "nameKz": "Частичный возврат по одному участнику",
          "shortname": "Частичный возврат по одному участнику",
          "code": "1",
          "id": "65b67662-e048-46e3-bab1-6ca3d4f8fe85"
        },
        "dappRefundStatusId": {
          "nameRu": "Обработано - отказано",
          "nameKz": null,
          "shortname": "Обработано - отказано",
          "code": "00004",
          "id": "b5597600-66f8-47d9-89d2-f3a12b7825d9"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": false,
        "refundDocumentList": null,
        "refundPayAmount": 2569,
        "personPatronname": "Федорович",
        "lastPayDate": "26.05.2017",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.44",
        "medinsStatus": null,
        "personSurname": "Жарков",
        "gcvpOrderNum": "49959",
        "personFirstname": "Иван",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "b15230ac-48e3-46cf-9e4e-c8e72aa7e429",
          "reference": "8D51A1D450",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "0D77",
          "appNumber": "4C78",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "450828000014",
        "entryDate": "22.11.2018",
        "appPayerDate": "28.05.2017",
        "id": "b8964ddd-7bec-4799-b302-009735ce0ac1",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Излишне начислены на работников",
          "nameKz": null,
          "shortname": "Излишне начислены на работников",
          "code": "00112",
          "id": "eccff8d7-7a83-402c-b4fd-0bde630f1c72"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "77A3FF1162D1625",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "31.05.2017",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Неверно указаны реквизиты платежа",
          "nameRu": "Неверно указаны реквизиты платежа",
          "nameKz": "Неверно указаны реквизиты платежа",
          "shortname": "Неверно указаны реквизиты платежа",
          "code": "3",
          "id": "2bd882a3-9723-4bb9-9c67-d22397603007"
        },
        "dappRefundStatusId": {
          "nameRu": "Отправлено-отказано",
          "nameKz": null,
          "shortname": "Отправлено-отказано",
          "code": "00008",
          "id": "6c6c5156-6530-462e-9a8b-2705336a176c"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": false,
        "refundDocumentList": null,
        "refundPayAmount": 2426.34,
        "personPatronname": "Павловна",
        "lastPayDate": "01.02.2016",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.52",
        "medinsStatus": null,
        "personSurname": "Васильева",
        "gcvpOrderNum": "63109",
        "personFirstname": "Маргарита",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "b15230ac-48e3-46cf-9e4e-c8e72aa7e429",
          "reference": "8D51A1D450",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "0D77",
          "appNumber": "4C78",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "230898000673",
        "entryDate": "22.11.2018",
        "appPayerDate": "03.02.2016",
        "id": "9bd873f3-15f4-44a0-94af-009883ce0c0d",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Излишне начислены на работников",
          "nameKz": null,
          "shortname": "Излишне начислены на работников",
          "code": "00112",
          "id": "c84fd389-2cd9-44fc-93ff-1313aa068f50"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "8BB5B7607455387",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "06.02.2016",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Частичный возврат по одному участнику",
          "nameRu": "Частичный возврат по одному участнику",
          "nameKz": "Частичный возврат по одному участнику",
          "shortname": "Частичный возврат по одному участнику",
          "code": "1",
          "id": "65b67662-e048-46e3-bab1-6ca3d4f8fe85"
        },
        "dappRefundStatusId": {
          "nameRu": "Обработано - отказано",
          "nameKz": null,
          "shortname": "Обработано - отказано",
          "code": "00004",
          "id": "b5597600-66f8-47d9-89d2-f3a12b7825d9"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": true,
        "refundDocumentList": null,
        "refundPayAmount": 2283.67,
        "personPatronname": "Николаевна",
        "lastPayDate": "23.03.2014",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.59",
        "medinsStatus": null,
        "personSurname": "Гордеева",
        "gcvpOrderNum": "19745",
        "personFirstname": "Флюра",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "b15230ac-48e3-46cf-9e4e-c8e72aa7e429",
          "reference": "8D51A1D450",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "0D77",
          "appNumber": "4C78",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "430889000297",
        "entryDate": "22.11.2018",
        "appPayerDate": "25.03.2014",
        "id": "2a9c2ff5-9628-4c33-9757-0098e135eeac",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Неверно указан код назначения платежа",
          "nameKz": null,
          "shortname": "Неверно указан код назначения платежа",
          "code": "00113",
          "id": "2dea5963-fa29-4cdb-9c70-24fa18b53094"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "EAEA95F7BDF7658",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "28.03.2014",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": { "nameRu": null, "nameKz": null, "code": null, "id": null },
        "dappRefundStatusId": {
          "nameRu": "Обработано-одобрено",
          "nameKz": null,
          "shortname": "Обработано-одобрено",
          "code": "00003",
          "id": "7db41225-e75a-4e72-8ea2-44bad4d1d8b5"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": true,
        "refundDocumentList": null,
        "refundPayAmount": 2854.67,
        "personPatronname": "Иномджонович",
        "lastPayDate": "18.10.2016",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.67",
        "medinsStatus": null,
        "personSurname": "Сурабов",
        "gcvpOrderNum": "66806",
        "personFirstname": "Баротджон",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "b15230ac-48e3-46cf-9e4e-c8e72aa7e429",
          "reference": "8D51A1D450",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "0D77",
          "appNumber": "4C78",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "710841000298",
        "entryDate": "22.11.2018",
        "appPayerDate": "20.10.2016",
        "id": "19e90790-e827-4721-9f7a-00992e8be514",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Ошибочно перечислены",
          "nameKz": null,
          "shortname": "Ошибочно перечислены",
          "code": "00111",
          "id": "bca52ced-f66b-4c33-afef-468f5adf545f"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "9A9A561D1977E75",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "23.10.2016",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Частичный возврат по одному участнику",
          "nameRu": "Частичный возврат по одному участнику",
          "nameKz": "Частичный возврат по одному участнику",
          "shortname": "Частичный возврат по одному участнику",
          "code": "1",
          "id": "65b67662-e048-46e3-bab1-6ca3d4f8fe85"
        },
        "dappRefundStatusId": {
          "nameRu": "Исполнено- одобрено",
          "nameKz": null,
          "shortname": "Исполнено- одобрено",
          "code": "00005",
          "id": "54195c26-e4fc-454e-a977-4114c2daabfd"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": false,
        "refundDocumentList": null,
        "refundPayAmount": 2711.65,
        "personPatronname": "Шарафович",
        "lastPayDate": "10.01.2016",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.37",
        "medinsStatus": null,
        "personSurname": "Нигматуллин",
        "gcvpOrderNum": "39525",
        "personFirstname": "Дамир",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "51bda5f4-24fe-49d1-a4c3-b8f447eaea7c",
          "reference": "115F08F58E",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "13CE",
          "appNumber": "5A6E",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "858033085838",
        "entryDate": "22.11.2018",
        "appPayerDate": "12.01.2016",
        "id": "a399294d-8893-403c-8e18-0095233057ad",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Ошибочно перечислены",
          "nameKz": null,
          "shortname": "Ошибочно перечислены",
          "code": "00111",
          "id": "76ea6966-7fa2-4e5c-9f61-e370a5249334"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "605F19D59C229E1",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "15.01.2016",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Частичный возврат по одному участнику",
          "nameRu": "Частичный возврат по одному участнику",
          "nameKz": "Частичный возврат по одному участнику",
          "shortname": "Частичный возврат по одному участнику",
          "code": "1",
          "id": "65b67662-e048-46e3-bab1-6ca3d4f8fe85"
        },
        "dappRefundStatusId": {
          "nameRu": "Отправлено-отказано",
          "nameKz": null,
          "shortname": "Отправлено-отказано",
          "code": "00008",
          "id": "6c6c5156-6530-462e-9a8b-2705336a176c"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": true,
        "refundDocumentList": null,
        "refundPayAmount": 2569,
        "personPatronname": "Прохоровна",
        "lastPayDate": "11.12.2015",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.44",
        "medinsStatus": null,
        "personSurname": "Ягнова",
        "gcvpOrderNum": "37123",
        "personFirstname": "Евгения",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "51bda5f4-24fe-49d1-a4c3-b8f447eaea7c",
          "reference": "115F08F58E",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "13CE",
          "appNumber": "5A6E",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "460870000054",
        "entryDate": "22.11.2018",
        "appPayerDate": "13.12.2015",
        "id": "895d8355-77c5-4e03-91fa-00955cd8f029",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Излишне начислены на работников",
          "nameKz": null,
          "shortname": "Излишне начислены на работников",
          "code": "00112",
          "id": "eccff8d7-7a83-402c-b4fd-0bde630f1c72"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "77A3FF1162D1625",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "16.12.2015",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Частичный возврат по одному участнику",
          "nameRu": "Частичный возврат по одному участнику",
          "nameKz": "Частичный возврат по одному участнику",
          "shortname": "Частичный возврат по одному участнику",
          "code": "1",
          "id": "65b67662-e048-46e3-bab1-6ca3d4f8fe85"
        },
        "dappRefundStatusId": {
          "nameRu": "Отправлено- одобрено",
          "nameKz": null,
          "shortname": "Отправлено- одобрено",
          "code": "00007",
          "id": "8050e0eb-74c0-48cd-9bd5-5089585cc577"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": true,
        "refundDocumentList": null,
        "refundPayAmount": 2426.34,
        "personPatronname": "Файзрахмановна",
        "lastPayDate": "29.09.2017",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.52",
        "medinsStatus": null,
        "personSurname": "Саляхова",
        "gcvpOrderNum": "20825",
        "personFirstname": "Нурсабах",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "51bda5f4-24fe-49d1-a4c3-b8f447eaea7c",
          "reference": "115F08F58E",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "13CE",
          "appNumber": "5A6E",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "140871000445",
        "entryDate": "22.11.2018",
        "appPayerDate": "01.10.2017",
        "id": "8cab9ed5-1ac2-4035-81fb-0095aebc2027",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Излишне начислены на работников",
          "nameKz": null,
          "shortname": "Излишне начислены на работников",
          "code": "00112",
          "id": "c84fd389-2cd9-44fc-93ff-1313aa068f50"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "8BB5B7607455387",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "04.10.2017",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Частичный возврат по одному участнику",
          "nameRu": "Частичный возврат по одному участнику",
          "nameKz": "Частичный возврат по одному участнику",
          "shortname": "Частичный возврат по одному участнику",
          "code": "1",
          "id": "65b67662-e048-46e3-bab1-6ca3d4f8fe85"
        },
        "dappRefundStatusId": {
          "nameRu": "Отправлено- одобрено",
          "nameKz": null,
          "shortname": "Отправлено- одобрено",
          "code": "00007",
          "id": "8050e0eb-74c0-48cd-9bd5-5089585cc577"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": true,
        "refundDocumentList": null,
        "refundPayAmount": 2283.67,
        "personPatronname": "Анатольевна",
        "lastPayDate": "24.01.2015",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.59",
        "medinsStatus": null,
        "personSurname": "Константинова",
        "gcvpOrderNum": "68322",
        "personFirstname": "Татьяна",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "51bda5f4-24fe-49d1-a4c3-b8f447eaea7c",
          "reference": "115F08F58E",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "13CE",
          "appNumber": "5A6E",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "650077005635",
        "entryDate": "22.11.2018",
        "appPayerDate": "26.01.2015",
        "id": "5a3684f7-7041-48a1-ab90-00960ebc98ef",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Неверно указан код назначения платежа",
          "nameKz": null,
          "shortname": "Неверно указан код назначения платежа",
          "code": "00113",
          "id": "2dea5963-fa29-4cdb-9c70-24fa18b53094"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "EAEA95F7BDF7658",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "29.01.2015",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": { "nameRu": null, "nameKz": null, "code": null, "id": null },
        "dappRefundStatusId": {
          "nameRu": "Отправлено- одобрено",
          "nameKz": null,
          "shortname": "Отправлено- одобрено",
          "code": "00007",
          "id": "8050e0eb-74c0-48cd-9bd5-5089585cc577"
        },
        "rpmuCheckResult": null
      }, {
        "isRefundConfirm": false,
        "refundDocumentList": null,
        "refundPayAmount": 2854.67,
        "personPatronname": "Вадимович",
        "lastPayDate": "11.07.2017",
        "wsStatusMessage": null,
        "payPeriod": "112018",
        "wsStatus": null,
        "payAmount": "2854.67",
        "medinsStatus": null,
        "personSurname": "Олейников",
        "gcvpOrderNum": "66546",
        "personFirstname": "Андрей",
        "outPayOrderNum": null,
        "applicationId": {
          "id": "51bda5f4-24fe-49d1-a4c3-b8f447eaea7c",
          "reference": "115F08F58E",
          "dknpId": {
            "nameRu": "Отчисления на обязательное социальное медицинское страхование",
            "nameKz": "Міндетті әлеуметтік медициналық сақтандыруға аударымдар",
            "shortname": "Обяз.соц.мед.страх.",
            "code": "121",
            "id": "c7889895-0075-4bc2-89e8-939507dd4fc6"
          },
          "payOrderNum": "13CE",
          "appNumber": "5A6E",
          "appEndDate": "01.12.2018",
          "appDate": "22.11.2018",
          "receiptAppdateToFsms": "23.11.2018",
          "payOrderDate": "22.11.2018",
          "refundCount": 5
        },
        "personIin": "610828000762",
        "entryDate": "22.11.2018",
        "appPayerDate": "13.07.2017",
        "id": "386917b4-e3fb-4101-b41d-00962189a7e1",
        "refundEntryDate": "22.11.2018",
        "changeDate": null,
        "daysLeft": null,
        "refundStatus": null,
        "drefundReasonId": {
          "nameRu": "Ошибочно перечислены",
          "nameKz": null,
          "shortname": "Ошибочно перечислены",
          "code": "00111",
          "id": "bca52ced-f66b-4c33-afef-468f5adf545f"
        },
        "refundDate": "22.11.2018",
        "appEndDate": "01.12.2018",
        "appRefundStatus": null,
        "refundStatusText": null,
        "gcvpReference": "9A9A561D1977E75",
        "receiptAppdateToFsms": "23.11.2018",
        "gcvpOrderDate": "16.07.2017",
        "lastMedcarePayCount": 9,
        "ddenyReasonId": {
          "shortnameKz": "Частичный возврат по одному участнику",
          "nameRu": "Частичный возврат по одному участнику",
          "nameKz": "Частичный возврат по одному участнику",
          "shortname": "Частичный возврат по одному участнику",
          "code": "1",
          "id": "65b67662-e048-46e3-bab1-6ca3d4f8fe85"
        },
        "dappRefundStatusId": {
          "nameRu": "Отправлено-отказано",
          "nameKz": null,
          "shortname": "Отправлено-отказано",
          "code": "00008",
          "id": "6c6c5156-6530-462e-9a8b-2705336a176c"
        },
        "rpmuCheckResult": null
      }],

    selectedRowKeys: []
  };

  componentWillUnmount = () => {

  };

  componentDidMount = () => {

  };

  render = () => {

    const { closeAction, selectAction } = this.props;

    let localColumns = localStorage.getItem("ImportModalGrid");
    let columnWidthScroll = null;

    if (localColumns) {
      columnWidthScroll = JSON.parse(localColumns).filter(x => x.isVisible).map(a => a.width).reduce((sum, v) => sum += v, 0) + 400;
    }

    return (<div>
      <Modal
        style={{ top: 0 }}
        title={"Информация"}
        visible={true}
        width={1000}
        centered
        onCancel={() => closeAction()}
        onOk={() => {
          selectAction(this.state.selectedRowKeys);
        }}>
        <SmartGridView
          name={"ImportModalGrid"}
          columns={this.state.columns}
          selectedRowCheckBox={true}
          selectedRowKeys={this.state.selectedRowKeys}
          rowKey={"id"}
          rowSelection={true}
          scroll={{
            x: columnWidthScroll ? columnWidthScroll : this.state.columns.filter(x => x.isVisible).map(a => a.width).reduce((sum, v) => sum += v, 0) + 400,
            y: 300
          }}
          hideFilterBtn={true}
          hideRefreshBtn={true}
          dataSource={{
            total: 1,
            pageSize: 15,
            page: 1,
            data: this.state.dataSource
          }}
          onColumnsChange={(isChanged) => {
            this.setState({
              isChangedColumn: isChanged
            });
          }}
          onSelectCheckboxChange={(selectedRowKeys) => {
            this.setState({
              selectedRowKeys: selectedRowKeys
            });
          }}
        />
      </Modal>
    </div>);
  };
}

export default ImportModalGrid;