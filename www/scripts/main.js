// (function () {

//     'use strict'

//     window.app = new Vue({
//         el: "#app",

//         data: {
//             data: [],
//             selectedCountryName: null,
//             selectedSiteName: null,
//             selectedData: null,
//             sites: [],
//             modalOpened: false,
//         },

//         methods: {
//             onDone: function (data, status, xhr) {
//                 this.data = data
//             },

//             onFail: function (xhr, errorType, err) {
//                 // on fail...
//             },

//             onSelectCountry: function () {
//                 this.sites = this.grouped_data[this.selectedCountryName].map(function (data) {
//                     return { text: data.SiteName, value: data.SiteName }
//                 })
//             },

//             onSelectSite: function () {
//                 for (var i = this.data.length - 1; i >= 0; i--) {
//                     if (this.selectedSiteName === this.data[i]['SiteName']) {
//                         this.selectedData = this.data[i]
//                     }
//                 }
//             },

//             reset: function () {
//                 this.selectedSiteName = null
//                 this.selectedData = null
//             },

//             openModal: function () {
//                 this.modalOpened = true
//             },

//             closeModal: function () {
//                 this.modalOpened = false
//             },
//         },

//         computed: {
//             bodyClass: function () {
//                 let bodyClass = null

//                 if (this.selectedData) {
//                     let pm = this.selectedData['PM2.5']

//                     console.log(this.selectedData.SiteName, pm)

//                     if      (pm <= 35)            { bodyClass = 'lv-1' }
//                     else if (pm > 35 && pm <= 53) { bodyClass = 'lv-2' }
//                     else if (pm > 53 && pm <= 70) { bodyClass = 'lv-3' }
//                     else                          { bodyClass = 'lv-4' }
//                 }

//                 return bodyClass || 'lv-1'
//             },

//             countries: function () {
//                 return Object.keys(this.grouped_data).map(function (data) {
//                     return { text: data, value: data }
//                 })
//             },

//             grouped_data: function () {
//                 let data = {}
//                 for (var i = this.data.length - 1; i >= 0; i--) {
//                     let obj = this.data[i]
//                     if (data[obj.County] === undefined) {
//                         data[obj.County] = [obj]
//                     } else {
//                         data[obj.County].push(obj)
//                     }
//                 }
//                 return data
//             }
//         },

//         ready: function () {
//             $.getJSON('AQX.json')
//              .done(this.onDone)
//              .fail(this.onFail)
//         }
//     })

// })()
