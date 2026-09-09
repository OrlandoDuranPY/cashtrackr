---
paths:
  - 'app/Http/Controllers/**'
---

# Controllers

## Controllers: ApiResponse trait, try/catch, transacción explícita
Todo método de controlador que escriba o responda JSON sigue este patrón (ver Auth/RegisterController y Auth/LoginController):

- `use App\Traits\ApiResponse;` y responder SIEMPRE con `successResponse()` / `errorResponse()`. Nunca `response()->json()` directo: la forma `{success, message, data|errors}` está homologada en el trait.
- Transacción explícita, no el closure `DB::transaction()`: `DB::beginTransaction()` ANTES del `try`, `DB::commit()` justo antes del return de éxito, `DB::rollBack()` como primera línea de cada salida de error (incluido el early return por credenciales inválidas). Decisión del equipo: se prefiere la forma explícita por legibilidad, aunque pierde el reintento en deadlock que da el closure.
- `catch (Throwable $e)`, no `\Exception`: atrapa también `Error`.
- Loguear con contexto (`Log::error('...', ['exception' => $e, ...])`) y devolver mensaje genérico en español. El detalle de la excepción lo agrega `errorResponse()` solo fuera de producción — no exponer `$e->getMessage()` a mano.
- Tipos de retorno explícitos (`View`, `JsonResponse`) y constantes `Response::HTTP_*` de Symfony en vez de números.
- Validación siempre en un Form Request de `app/Http/Requests/`; no atrapar `ValidationException` (Laravel ya la convierte en 422).
- Rate limiting por middleware de ruta (`throttle:5,1`), no en el controlador.
