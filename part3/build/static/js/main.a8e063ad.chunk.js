(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),o=t.n(c),a=t(14),u=t.n(a),r=t(3),i=t(0),s=function(e){var n=e.text,t=e.value,c=e.handleChange;return Object(i.jsxs)("div",{children:[n," ",Object(i.jsx)("input",{value:t,onChange:c})]})},l=function(e){var n=e.dataPerson,t=e.handleRemove;return Object(i.jsx)("div",{children:n.map((function(e){return Object(i.jsxs)("li",{children:[e.name," ",e.number,Object(i.jsx)("button",{onClick:function(n){t(n,e)},children:"delete"})]},e.name)}))})},d=function(e){var n=e.handleSubmit,t=e.inputNameValue,c=e.inputNameChange,o=e.inputNumberValue,a=e.inputNumberChange,u=e.handleSubmitButton;return Object(i.jsx)("div",{children:Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:c}),Object(i.jsx)("br",{}),"number: ",Object(i.jsx)("input",{value:o,type:"tel",onChange:a})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",onClick:u,children:"add"})})]})})},b=t(4),h=t.n(b),f="https://fullstackopen2021-part3.herokuapp.com/api/persons",j=function(){return h.a.get(f).then((function(e){return e.data}))},m=function(e){return h.a.post(f,e).then((function(e){return e.data}))},p=function(e){return h.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},O=function(e,n){return h.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.types;return null===n?null:Object(i.jsx)("div",{className:t,children:n})},x=function(){var e=Object(c.useState)([]),n=Object(r.a)(e,2),t=n[0],o=n[1],a=Object(c.useState)(""),u=Object(r.a)(a,2),b=u[0],h=u[1],f=Object(c.useState)(""),x=Object(r.a)(f,2),g=x[0],w=x[1],C=Object(c.useState)(""),S=Object(r.a)(C,2),k=S[0],y=S[1],N=Object(c.useState)([]),T=Object(r.a)(N,2),L=T[0],V=T[1],B=Object(c.useState)(""),D=Object(r.a)(B,2),P=D[0],E=D[1],I=Object(c.useState)(""),J=Object(r.a)(I,2),R=J[0],A=J[1];Object(c.useEffect)((function(){console.log("in effect"),j().then((function(e){console.log("personService OK"),o(e),V(e)}))}),[]);var K=function(e){e.preventDefault();var n={name:b,number:g};if(t.some((function(e){return e.name.toLowerCase()===b.toLowerCase()}))){if(window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))){var c=t.findIndex((function(e){return e.name.toLowerCase()===b.toLowerCase()})),a=t[c];O(a.id,n).then((function(e){console.log("update success!");var n=t.filter((function(e){return e.id!==a.id}));n.push(e),o(n),V(n),h(""),w(""),y(""),E("'".concat(a.name,"' s number have been updated")),A("success"),setTimeout((function(){E(null)}),5e3)})).catch((function(e){console.log("fail"),E("'".concat(a.name,"' has already been removed from the server")),A("error"),setTimeout((function(){E(null)}),5e3)}))}}else m(n).then((function(e){console.log("create success!");var n=t.concat(e);o(n),V(n),h(""),w(""),y(""),E("'".concat(e.name,"' is successfully added.")),A("success"),setTimeout((function(){E(null)}),5e3)})).catch((function(e){console.log("fail"),E("'".concat(n.name,"' is already on the server.")),A("error"),setTimeout((function(){E(null),A("")}),5e3)}))};return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(v,{message:P,types:R}),Object(i.jsx)(s,{text:"filter shown with:",value:k,handleChange:function(e){y(e.target.value),V(t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())})))}}),Object(i.jsx)("h3",{children:"Add new person"}),Object(i.jsx)(d,{handleSubmit:K,inputNameValue:b,inputNameChange:function(e){h(e.target.value)},inputNumberValue:g,inputNumberChange:function(e){w(e.target.value)},handleSubmitButton:K}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(l,{dataPerson:L,handleRemove:function(e,n){e.preventDefault(),window.confirm("Delete ".concat(n.id,"?"))&&p(n.id).then((function(){console.log("delete success!");var e=t.filter((function(e){return n.id!==e.id}));o(e),V(e),E("".concat(n.name," is successfully deleted.")),A("success"),setTimeout((function(){E(null),A("")}),5e3)})).catch((function(e){console.log("fail"),E("There's an error"),A("error"),setTimeout((function(){E(null),A("")}),5e3)}))}})]})};t(38);u.a.render(Object(i.jsx)(o.a.StrictMode,{children:Object(i.jsx)(x,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.a8e063ad.chunk.js.map