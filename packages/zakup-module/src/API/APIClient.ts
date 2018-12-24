import { AxiosData, DictionaryBaseML, Identifiable, ListData } from '@vitacore/shared-ui'
import { message } from 'antd'
import axios from 'axios'
import { Moment } from 'moment'
import { Activity } from '../Entities/Activity'
import { CommissionMember } from '../Entities/CommissionMember'
import { DocumentAttachment } from '../Entities/DocumentAttachment'
import { ProtocolItem } from '../Entities/Protocol'
import { getHistory } from '../Redux/history'
import { callAppFunction, requestFinished, requestStarted } from '../utils'
const mime = require('mime-types')

let baseUrl: string = 'http://185.27.192.177:6307/api'
class APIClient {
  public static async doApiCall(
    url: string,
    method?: string,
    data?: any,
    params?: any,
    tokenRequired: boolean = true,
    contentType?: string,
    responseType?: string
  ): Promise<any> {
    if (!url || url.length === 0) {
      throw new Error('No URL provided')
    }

    if (!baseUrl) {
      let origin = window.location.origin
      if (!origin || origin.length === 0) {
        throw new Error('Cannot parse current url')
      }

      if (origin[origin.length - 1] === '/') {
        origin = origin.substr(0, origin.length - 1)
      }

      baseUrl = `${origin}/api`
    }

    const headers = {}

    if (tokenRequired) {
      const authToken = callAppFunction('getAuthToken')
      if (!authToken) {
        console.log('No auth token provided')
        getHistory().push('/login')
      }

      headers['Authorization'] = `Bearer ${authToken}`
    }

    if (data) {
      headers['Content-Type'] = contentType || 'application/json; charset=UTF-8'
    }

    const formattedUrl = baseUrl + (url[0] !== '/' ? `/${url}` : url)
    const requestObj = {
      method: data && !method ? 'post' : method || 'get',
      url: formattedUrl,
      data,
      params,
      headers,
      responseType,
    }

    // tslint:disable-next-line:no-string-literal
    if (axios.interceptors.request['handlers'].length === 0) {
      axios.interceptors.request.use(config => {
        requestStarted()
        return config
      })
    }

    // tslint:disable-next-line:no-string-literal
    if (axios.interceptors.response['handlers'].length === 0) {
      axios.interceptors.response.use(
        response => {
          requestFinished()
          return response
        },
        error => {
          requestFinished()
          if (error.response && error.response.status === 401) {
            message.error(error.response.statusText)
            getHistory().push('/login')
          }
          return Promise.reject(error)
        }
      )
    }

    return axios(requestObj).catch(error => {
      // tslint:disable-next-line:no-console
      console.log(error)
      if (error.response && error.response.status === 401) {
        message.error(error.response.statusText)
        getHistory().push('/login')
      }
      throw error
    })
  }

  public fetchDict<T = DictionaryBaseML>(dictName: string, dictAlias?: string, sortNeeded: boolean = true) {
    const data = {
      start: 0,
      length: 100000,
      entity: dictName,
    }

    if (sortNeeded) {
      data['sort'] = [
        {
          field: 'code',
        },
      ]
    }

    return APIClient.doApiCall('/uicommand/getList', 'POST', data) as Promise<AxiosData<ListData<T>>>
  }

  public fetchNotices(page: number, pageSize: number) {
    return APIClient.doApiCall('/uicommand/getList', 'POST', {
      start: page,
      length: pageSize,
      entity: 'notice',
      sort: [
        {
          field: 'dateBegin',
          desc: true,
        },
      ],
    })
  }

  public fetchNotice(id: string) {
    return APIClient.doApiCall('/uicommand/getObject', 'POST', {
      id,
      entity: 'notice',
    })
  }

  public saveNotice(notice: {
    id?: string
    dateBegin: Moment
    dateEnd: Moment
    name: string
    region: string
    periodYear: string
    noticeMedicalForms: Array<{ id?: string; medicalForm: DictionaryBaseML }>
    noticeMedicalTypes: Array<{ id?: string; medicalType: DictionaryBaseML }>
  }) {
    const data = {
      noticeType: {
        id: notice.name,
      },
      region: {
        id: notice.region,
      },
      periodYear: {
        id: notice.periodYear,
      },
      noticeMedicalTypes: notice.noticeMedicalTypes,
      noticeMedicalForms: notice.noticeMedicalForms,
      dateBegin: notice.dateBegin.format('DD.MM.YYYY HH:mm'),
      dateEnd: notice.dateEnd.format('DD.MM.YYYY HH:mm'),
    }

    if (notice.id) {
      data['id'] = notice.id
    }

    const request = {
      entity: 'notice',
      alias: null,
      data,
    }

    return APIClient.doApiCall('/uicommand/saveObject', 'POST', request)
  }

  public createProtocol(noticeId: string) {
    return APIClient.doApiCall('/contract/createPlanProtocolByNotice', 'POST', {
      noticeId,
    })
  }

  public fetchCommissions() {
    return APIClient.doApiCall('/uicommand/getList', 'POST', {
      start: 0,
      length: 1000,
      entity: 'meeting',
      alias: 'meetingList',
    })
  }

  public fetchSingleCommission(id: string) {
    return APIClient.doApiCall('/uicommand/getObject', 'POST', {
      start: 0,
      length: 1000,
      entity: 'meeting',
      id,
    })
  }

  public saveCommission(commission: {
    id?: string
    region: string
    dateBegin: string
    meetingMembers: CommissionMember[]
  }) {
    const data = {
      region: {
        id: commission.region,
      },
      dateBegin: commission.dateBegin,
      meetingMembers: commission.meetingMembers,
    }

    if (commission.id) {
      data['id'] = commission.id
    }

    const request = {
      entity: 'meeting',
      alias: null,
      data,
    }

    return APIClient.doApiCall('/uicommand/saveObject', 'POST', request)
  }

  public deleteCommissionMember(id: string) {
    const data = {
      entity: 'meetingMember',
      alias: null,
      id,
    }
    return APIClient.doApiCall('/uicommand/deleteObject', 'POST', data)
  }

  public findPersonByIIN(iin: string) {
    return APIClient.doApiCall('/contract/getPersonByIIN', 'GET', null, { iin })
  }

  public fetchApplications(page: number, pageSize: number) {
    return APIClient.doApiCall('/uicommand/getList', 'POST', {
      start: page,
      length: pageSize,
      entity: 'app',
      alias: 'appList',
    })
  }

  public fetchApplicationById(id: string) {
    return APIClient.doApiCall('/uicommand/getObject', 'POST', {
      entity: 'app',
      alias: null,
      id,
    })
  }

  public saveApplication(application: {
    number: ''
    descr: ''
    documentDate: Moment
    periodYear: Identifiable
    applicationItems: Array<{ id?: string; activity: Identifiable }>
  }) {
    const request = {
      entity: 'app',
      alias: null,
      data: {
        ...application,
        applicationItems: application.applicationItems.map(i => ({
          ...i,
        })),
      },
    }

    return APIClient.doApiCall('/uicommand/saveObject', 'POST', request)
  }

  public fetchProposals(page: number, pageSize: number, noticeId?: string) {
    const data = {
      start: page,
      length: pageSize,
      entity: 'proposal',
      alias: 'proposalList',
    }

    if (noticeId) {
      data['filter'] = {
        'notice.id': noticeId,
      }
    }

    return APIClient.doApiCall('/uicommand/getList', 'POST', data)
  }

  public fetchProposalById(id: string) {
    return APIClient.doApiCall('/uicommand/getObject', 'POST', {
      entity: 'proposal',
      alias: null,
      id,
    })
  }

  public saveProposal(proposal: {
    number: ''
    descr: ''
    documentDate: Moment
    periodYear: Identifiable
    clinic: Identifiable
    region: Identifiable
    proposalItems: Array<{
      activity: Pick<Activity, 'id'>
      proposalItemValues: Array<{
        measureUnit: Pick<DictionaryBaseML, 'id'>
        value: number
      }>
    }>
  }) {
    const request = {
      entity: 'proposal',
      alias: null,
      data: proposal,
    }

    return APIClient.doApiCall('/uicommand/saveObject', 'POST', request)
  }

  public fetchProtocols(page: number, pageSize: number, filter?: any) {
    return APIClient.doApiCall('/uicommand/getList', 'POST', {
      start: page,
      length: pageSize,
      entity: 'planProtocol',
      alias: 'planProtocolList',
      filter,
    })
  }

  public fetchProtocolById(id: string) {
    return APIClient.doApiCall('/uicommand/getObject', 'POST', {
      entity: 'planProtocol',
      alias: 'planProtocolList',
      id,
    })
  }

  public fetchProtocolActivityGroupInfos(planProtocolId: string) {
    return APIClient.doApiCall('/uicommand/getList', 'POST', {
      start: 0,
      length: 100000,
      entity: 'planProtocolActivity',
      filter: {
        planProtocolId,
      },
      sort: [
        {
          field: 'activity.code',
        },
        {
          field: 'activity.name',
        },
      ],
    })
  }

  public fetchProtocolActivityMeasureUnits(planProtocolId: string, activityId: string) {
    return APIClient.doApiCall('/uicommand/getList', 'POST', {
      start: 0,
      length: 200,
      entity: 'planProtocolColumns',
      filter: {
        planProtocolId,
        activityId,
      },
    })
  }

  public fetchProtocolItems(planProtocolId: string, activityId: string, page: number, pageSize: number) {
    return APIClient.doApiCall('/uicommand/getList', 'POST', {
      start: page,
      length: pageSize,
      entity: 'planProtocolItem',
      filter: {
        'activity.id': activityId,
        planProtocolId,
      },
      sort: [
        {
          field: 'clinic.shortName',
        },
      ],
    }) as Promise<AxiosData<ListData<ProtocolItem>>>
  }

  public deleteApplication(id: string) {
    return APIClient.doApiCall('/uicommand/deleteObject', 'POST', {
      entity: 'app',
      id,
    })
  }

  public acceptApplication(id: string) {
    return APIClient.doApiCall(`/contract/registerClinic?entity=app&applicationId=${id}`, 'GET')
  }

  public declineApplication(id: string, rejectText: string) {
    return Promise.resolve()
  }

  public deleteProposal(id: string) {
    return APIClient.doApiCall('/uicommand/deleteObject', 'POST', {
      entity: 'proposal',
      id,
    })
  }

  public acceptProposal(id: string) {
    return Promise.resolve()
  }

  public declineProposal(id: string, rejectText: string) {
    return Promise.resolve()
  }

  public savePlanProtocolItem(item: { id: string; planProtocolItemValues: Array<{ id: string; value: number }> }) {
    return APIClient.doApiCall('/uicommand/saveObject', 'POST', {
      entity: 'planProtocolItem',
      alias: null,
      data: item,
    })
  }

  public downloadFile(id: string) {
    return APIClient.doApiCall('/uicommand/downloadFile', 'POST', {
      entity: 'documentAttachment',
      id,
    })
  }

  public uploadFile(entity: string, id: string, doc: DocumentAttachment) {
    const formData = new FormData()
    formData.append('entity', entity)
    formData.append('path', 'documentAttachments')
    formData.append('id', id)
    formData.append(
      'filedata',
      JSON.stringify({
        entity: 'documentAttachment',
        alias: null,
        data: { fileDescription: doc.fileDescription, attachmentType: { id: doc.attachmentType!.id } },
      })
    )
    formData.append('content', doc.file!)

    return APIClient.doApiCall('/uicommand/uploadFile', 'POST', formData)
  }

  public deleteFile(id: string) {
    return APIClient.doApiCall('/uicommand/deleteObject', 'POST', {
      entity: 'documentAttachment',
      id,
    })
  }

  public getCommands(entity: string) {
    return APIClient.doApiCall(`/uicommand/getCommands?entity=${entity}&context=`)
  }

  public runCommand(commandId: string, objIds: string[], isReport?: boolean) {
    console.log(isReport)
    const resp = APIClient.doApiCall(
      '/uicommand/runCommand',
      'POST',
      { id: commandId, parameters: [], obj_ids: objIds },
      undefined,
      undefined,
      undefined,
      isReport ? 'blob' : undefined
    )

    if (isReport) {
      resp.then(data => {
        const contentType = data.headers['content-type']
        const fileExtension = mime.extension(contentType)
        const fileName = `Report.${fileExtension}`

        const a = document.createElement('a')
        const url = window.URL.createObjectURL(data.data)
        a.href = url
        a.download = fileName
        a.click()
        window.URL.revokeObjectURL(url)
      })
    }

    return resp
  }

  public publishProtocol(id: string) {
    return APIClient.doApiCall(`/contract/publishDocument?entity=planProtocol&id=${id}`)
  }
}

export default APIClient
