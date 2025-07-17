// src/api/complaint.js
// 投诉相关接口封装
import request from '../utils/request'

/**
 * 获取投诉列表
 * @param {Object} params 查询参数
 * @returns {Promise}
 */
export function getComplaintList(params) {
  // 这里 params 结构应为：
  // {
  //   salesCustomer: string,
  //   startDate: string,
  //   endDate: string,
  //   status: string,
  //   pageIndex: number,
  //   pageSize: number
  // }
  return request({
    url: '/prodTrace/GetComplaintList',
    method: 'post',
    data: params
  })
}

/**
 * 获取投诉详情
 * @param {string} complaintNo 投诉单号
 * @returns {Promise}
 */
export function getComplaintDetail(complaintNo) {
  return request({
    url: '/prodTrace/GetComplaintDetail',
    method: 'get',
    params: {
      complaintNo
    }
  })
}

/**
 * 更新投诉处理状态
 * @param {Object} data 更新数据
 * @param {string} data.complaintNo 投诉单号
 * @param {string} data.handleStatus 处理状态 (1处理中 2同意退货 3不同意退货)
 * @param {string} data.handleComment 处理意见
 * @returns {Promise}
 */
export function updateComplaintStatus(data) {
  return request({
    url: '/prodTrace/UpdateComplaintStatus',
    method: 'post',
    data: {
      complaintNo: data.complaintNo,
      handleStatus: data.handleStatus,
      handleComment: data.handleComment
    }
  })
}

/**
 * 文件下载接口
 * @param[object Object]string} field 文件字段名
 * @returns {string} 文件下载URL
 */
export function getFileDownloadUrl(field) {
  // 返回完整的文件下载URL
  return `${import.meta.env.VITE_API_BASE_URL || ''}/api/file/download/image?field=${encodeURIComponent(field)}`
}