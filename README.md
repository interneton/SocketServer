# 프로젝트 설명

 Unity 클라이언트와의 실시간 통신을 위한 TCP 소켓 서버를 구축합니다. 서버는 플레이어 위치 업데이트, 세션 관리, 오류 처리와 같은 다양한 게임 관련 기능을 처리하며, Protocol Buffers를 사용하여 구조화된 데이터를 교환합니다.

## 주요 구성 요소

- **TCP 소켓 통신**: 서버는 Socket.IO 대신 TCP 연결을 사용하여 데이터 스트림에 대한 low-level 제어를 제공합니다.
- **핑(ping) 패킷**: 주기적인 핑 패킷을 통해 연결을 안정적으로 유지하고 지연 시간을 모니터링하며 잠재적인 연결 끊김을 처리합니다.
- **Protocol Buffers**: `.proto` 파일을 통해 효율적인 데이터 직렬화 및 전송을 위한 데이터 구조를 정의합니다.
- **세션 관리**: 별도의 모듈이 게임 및 사용자 세션을 관리하여 각 클라이언트가 고유하고 일관된 게임 상태를 유지할 수 있도록 합니다.
- **데이터베이스 통합**: 사용자 데이터와 게임 세션이 MySQL에 저장되며, 생성, 조회, 업데이트를 위한 유틸리티를 포함하고 있습니다.

## 루트 디렉터리
- **server.js**: 서버의 메인 진입 파일로, 서버를 초기화하고 연결을 설정하며 소켓 통신을 시작합니다.

## 폴더 경로

### `/classes`
게임 로직을 구성하는 주요 클래스 정의 및 관리자를 포함합니다.

- **/managers/interval.manager.js**: 게임 내 반복 작업과 시간 이벤트를 관리합니다.
- **/models/game.class.js**: 게임 관련 데이터와 로직을 정의하는 메인 게임 클래스입니다.
- **/models/user.class.js**: 사용자별 데이터와 동작을 다루는 사용자 클래스를 정의합니다.

### `/config`
환경 및 상수를 설정하는 구성 파일이 포함됩니다.

- **config.js**: 프로젝트의 중앙 구성 파일입니다.

### `/constants`
애플리케이션 전반에서 사용하는 상수 값을 저장합니다.

- **env.js**: 환경 변수를 설정합니다.
- **handlerId.js**: 이벤트 핸들링과 관련된 상수입니다.
- **header.js**: 프로토콜이나 데이터 구조 정의에 사용하는 헤더 상수입니다.

### `/db`
데이터베이스 설정, 마이그레이션 스크립트, 사용자 데이터를 위한 SQL 쿼리가 포함됩니다.

- **database.js**: 데이터베이스 연결을 설정하고 관리합니다.
- **migration/createSchemas.js**: 데이터베이스 마이그레이션 스크립트로, 테이블을 생성합니다.
- **sql/user_db.sql**: 사용자 테이블 스키마를 포함하는 SQL 파일입니다.
- **user/user.db.js**: 사용자 관련 데이터베이스 상호작용을 처리합니다.
- **user/user.queries.js**: 사용자 작업에 대한 SQL 쿼리를 정의합니다.

### `/events`
소켓 라이프사이클 이벤트를 관리하는 이벤트 핸들러가 포함됩니다.

- **onConnection.js**: 클라이언트 연결을 처리합니다.
- **onData.js**: 클라이언트에서 들어오는 데이터를 처리합니다.
- **onEnd.js**: 클라이언트 연결 종료를 관리합니다.
- **onError.js**: 소켓 통신 중 발생하는 오류를 처리합니다.

### `/handler`
게임 및 사용자 상호작용을 위한 이벤트 핸들러 관리가 중심입니다.

- **index.js**: 메인 핸들러 진입 파일로, 이벤트 핸들러를 초기화하고 관리합니다.
- **game/locationUpdate.handler.js**: 게임 내 위치 업데이트를 처리합니다.
- **user/initial.handler.js**: 초기 사용자 연결 설정을 관리합니다.

### `/init`
서버 구성 요소를 초기화하고 필요한 파일을 로드합니다.

- **index.js**: 필수 모듈을 로드하고 구성 요소를 초기화합니다.
- **loadProtos.js**: 데이터 직렬화를 위한 Protocol Buffers 파일을 로드합니다.

### `/protobuf`
구조화된 데이터 통신을 위해 Protocol Buffers 정의 파일을 포함합니다.

- **/notification/game.notification.proto**: 게임 알림 구조를 정의합니다.
- **/request/**: 요청에 대한 `.proto` 파일을 포함하며, `common.proto`, `game.proto`, `initial.proto`가 있습니다.
- **/response/response.proto**: 서버 응답의 구조를 정의합니다.

### `/sessions`
사용자와 게임 세션을 관리합니다.

- **game.session.js**: 게임 관련 세션 데이터를 관리합니다.
- **sessions.js**: 중앙 세션 관리자입니다.
- **user.session.js**: 사용자 세션 데이터를 관리합니다.

### `/utils`
다양한 기능을 지원하는 유틸리티 함수와 도구가 포함됩니다.

- **dateFormatter.js**: 날짜 값을 형식화합니다.
- **transformCase.js**: 텍스트의 대소문자를 변환합니다.
- **db/testConnection.js**: 데이터베이스 연결을 테스트합니다.
- **error/**: 커스텀 오류 처리 유틸리티입니다:
  - `customError.js`: 커스텀 오류 유형을 정의합니다.
  - `errorCodes.js`: 특정 오류 코드를 매핑합니다.
  - `errorHandler.js**`: 중앙 오류 핸들러입니다.
- **notification/game.notification.js**: 게임 내 알림을 관리합니다.
- **parser/packetParser.js**: 클라이언트에서 들어오는 데이터 패킷을 구문 분석합니다.
- **response/createResponse.js**: 클라이언트에 보낼 구조화된 응답을 생성합니다.

---