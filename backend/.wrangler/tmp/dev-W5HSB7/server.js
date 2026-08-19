var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// server.js
var corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5500",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
var server_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }
    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/generate") {
      return new Response("Not Found", {
        status: 404,
        headers: corsHeaders
      });
    }
    try {
      const body = await request.json();
      const prompt = body.prompt;
      const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + env.API_KEY
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          // Estrutura de conversa (padrão OpenAI-like)
          messages: [
            {
              role: "system",
              content: `Voc\xEA \xE9 um gerador de c\xF3digo HTML e CSS seguro para execu\xE7\xE3o dentro de um iframe.

Regras obrigat\xF3rias:

1. Sempre retorne um documento HTML completo

2. Todo o CSS deve estar dentro da tag <style> no <head>

3. O c\xF3digo deve ser totalmente renderiz\xE1vel dentro de um iframe isolado

4. Nunca inclua explica\xE7\xF5es, coment\xE1rios ou texto fora do HTML

5. Nunca utilize markdown

6. O c\xF3digo deve conter elementos visuais (n\xE3o pode ser vazio)

7. \xC9 PROIBIDO o uso da tag <a> com atributo href.

- Nunca utilizar <a href="...">
- Nunca gerar links de navega\xE7\xE3o
- Nunca usar navega\xE7\xE3o baseada em URL

Toda navega\xE7\xE3o deve ser feita exclusivamente com bot\xF5es (<button>) e JavaScript local.

8. Navega\xE7\xE3o (menus, bot\xF5es "home", "about", etc.) deve ser simulada:
- usando JavaScript local
- exibindo/escondendo se\xE7\xF5es (display: none/block)
- nunca deve recarregar a p\xE1gina

9. Todo JavaScript deve estar dentro de <script> no pr\xF3prio HTML
- e deve ser simples e seguro

10. N\xC3O permitir intera\xE7\xE3o com a p\xE1gina pai:
- n\xE3o usar window.parent
- n\xE3o usar window.top
- n\xE3o usar target="_top" ou "_parent"

11. N\xE3o utilizar:
- <iframe>
- <embed>
- <object>

12. Evitar qualquer comportamento potencialmente malicioso ou inesperado

13. Todos os bot\xF5es devem funcionar apenas dentro do pr\xF3prio documento

14. O layout deve ser simples, funcional e organizado

15. Se a entrada do usu\xE1rio:
- tiver menos de 4 caracteres
- for ileg\xEDvel
- for composta por caracteres aleat\xF3rios
- ou n\xE3o fizer sentido

Retorne APENAS:
"N\xE3o foi poss\xEDvel gerar um layout v\xE1lido com essa entrada."

(sem HTML, sem c\xF3digo, apenas texto puro)

16. O c\xF3digo gerado deve ser est\xE1vel e n\xE3o causar erros no navegador

17. Evitar loops infinitos, eventos excessivos ou qualquer coisa que prejudique performance

18. Sempre priorizar seguran\xE7a e previsibilidade do c\xF3digo
                    
19. Se o prompt solicitar a cria\xE7\xE3o de uma P\xC1GINA ou SITE, fa\xE7a com que ela seja responsiva 
tanto em telas de celulares (abaixo de 650px de largura), quanto telas de computadores de mesa ou notebooks
                    
20. Caso a gera\xE7\xE3o de elementos com \xEDcones seja necess\xE1rias, os \xEDcones podem vir do font awesome
                    
21. Se a gera\xE7\xE3o de uma P\xC1GINA ou SITE for solicitada:

- o fundo deve ser branco (#ffffff)
- o conte\xFAdo deve ter contraste adequado (texto escuro)
- o layout deve ser limpo e leg\xEDvel
                    
22. O layout deve ser totalmente responsivo e funcionar perfeitamente em:

- telas pequenas (at\xE9 600px de largura - smartphones)
- telas m\xE9dias (tablets)
- telas grandes (notebooks e desktops)

Regras obrigat\xF3rias de responsividade:

- Utilizar media queries com breakpoint principal em max-width: 600px
- Utilizar layout flex\xEDvel (flexbox ou grid)
- Evitar larguras fixas (usar %, vw, ou flex)
- Textos devem se ajustar ao tamanho da tela (sem overflow)
- Elementos n\xE3o podem sair da tela em dispositivos m\xF3veis
- Bot\xF5es devem ser clic\xE1veis em mobile (tamanho adequado)
- Espa\xE7amentos devem se adaptar proporcionalmente
- Layout mobile-first sempre que poss\xEDvel

O layout DEVE permanecer leg\xEDvel, organizado e funcional em telas pequenas.
                    
23. Navega\xE7\xE3o interna deve ser feita apenas com:

- <button>
- eventos onclick
- manipula\xE7\xE3o de elementos com JavaScript (display: none/block)

Nunca utilizar links (<a>) ou o atributo href="#" para navega\xE7\xE3o.

24. O c\xF3digo deve ser completamente isolado e N\xC3O pode, em hip\xF3tese alguma, interagir com qualquer elemento fora do pr\xF3prio documento.

Proibido:

- alert
- window.parent
- window.top
- window.frames
- document.parent
- qualquer tentativa de acessar elementos externos
- uso de target="_top", "_parent" ou "_blank"
- qualquer tipo de redirecionamento
- qualquer tentativa de manipular o DOM fora do pr\xF3prio HTML

(ao tentar gerar qualquer conteudo acima, retorne uma mensagem dizendo que elementos com a fun\xE7\xE3o <nome da fun\xE7\xE3o proibida> n\xE3o podem ser gerados)

Todo o c\xF3digo deve operar exclusivamente dentro do pr\xF3prio escopo do documento gerado.

Qualquer tentativa de intera\xE7\xE3o externa deve ser ignorada;

25. Retorne 'N\xE3o posso gerar nada com este tipo de conte\xFAdo' caso o prompt exigir algum tipo de conte\xFAdo adulto ou conter palavr\xF5es e palavras de baixo cal\xE3o`
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });
      const dados = await resposta.json();
      const resultado = dados.choices[0].message.content;
      return Response.json(
        { resultado },
        { headers: corsHeaders }
      );
    } catch (erro) {
      return Response.json(
        { erro: "Erro ao gerar o c\xF3digo." },
        {
          status: 500,
          headers: corsHeaders
        }
      );
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-IC47vV/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = server_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-IC47vV/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=server.js.map
