FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG NEXT_GTM_CODE
ARG NEXT_API_BASE_URL

ENV NEXT_PUBLIC_DRUPAL_BASE_URL=${NEXT_PUBLIC_DRUPAL_BASE_URL}
ENV NEXT_IMAGE_DOMAIN=${NEXT_IMAGE_DOMAIN}
ENV NEXT_GTM_CODE=${NEXT_GTM_CODE}
ENV NEXT_API_BASE_URL=${NEXT_API_BASE_URL}

RUN echo "NEXT_PUBLIC_DRUPAL_BASE_URL=${NEXT_PUBLIC_DRUPAL_BASE_URL}" && \
    echo "NEXT_IMAGE_DOMAIN=${NEXT_IMAGE_DOMAIN}" && \
    echo "NEXT_GTM_CODE=${NEXT_GTM_CODE}" && \
    echo "NEXT_API_BASE_URL=${NEXT_API_BASE_URL}"

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build


FROM node:20-alpine

ARG NEXT_PUBLIC_DRUPAL_BASE_URL
ARG NEXT_IMAGE_DOMAIN
ARG NEXT_GTM_CODE
ARG NEXT_API_BASE_URL

ENV NEXT_PUBLIC_DRUPAL_BASE_URL=${NEXT_PUBLIC_DRUPAL_BASE_URL}
ENV NEXT_IMAGE_DOMAIN=${NEXT_IMAGE_DOMAIN}
ENV NEXT_GTM_CODE=${NEXT_GTM_CODE}
ENV NEXT_API_BASE_URL=${NEXT_API_BASE_URL}

RUN echo "NEXT_PUBLIC_DRUPAL_BASE_URL=${NEXT_PUBLIC_DRUPAL_BASE_URL}" && \
    echo "NEXT_IMAGE_DOMAIN=${NEXT_IMAGE_DOMAIN}" && \
    echo "NEXT_GTM_CODE=${NEXT_GTM_CODE}" && \
    echo "NEXT_API_BASE_URL=${NEXT_API_BASE_URL}"

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["npm", "run", "start"]
