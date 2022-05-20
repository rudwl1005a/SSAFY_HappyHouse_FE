<template>
    <div :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }" style="margin: 80px 10px 0 0">
        <nav>
            <div class="nav nav-tabs mb-4" id="nav-tab" role="tablist">
                <a @click="freeBoard" class="nav-item nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" style="margin-right: 10px">자유게시판</a>
                <a @click="qnaBoard" class="nav-item nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" style="margin-right: 10px">Q&A</a>
                <a @click="noticeBoard" class="nav-item nav-link" id="nav-contact-tab" data-bs-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">공지사항</a>
            </div>
        </nav>
        <div class="table-settings mb-4">
            <div class="row align-items-center justify-content-between">
                <div class="col col-md-6 col-lg-3 col-xl-4">
                    <div class="input-group me-2 me-lg-3 fmxw-400">
                        <span class="input-group-text">
                            <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Search orders" />
                    </div>
                </div>
                <div class="col-4 col-md-2 col-xl-1 ps-md-0 text-end">
                    <div class="dropdown">
                        <button class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-xs dropdown-menu-end pb-0">
                            <span class="small ps-3 fw-bold text-dark">Show</span>
                            <a class="dropdown-item d-flex align-items-center fw-bold" href="#"
                                >10
                                <svg class="icon icon-xxs ms-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg
                            ></a>
                            <a class="dropdown-item fw-bold" href="#">20</a>
                            <a class="dropdown-item fw-bold rounded-bottom" href="#">30</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-body border-0 shadow table-wrapper table-responsive">
            <table class="table table-hover" style="width: 100%; table-layout: fixed">
                <thead>
                    <tr>
                        <th class="col-1 border-gray-200">#</th>
                        <th class="col-6 border-gray-200">title</th>
                        <th class="col-2 border-gray-200">writer</th>
                        <th class="col-1 border-gray-200">date</th>
                        <th class="col-1 border-gray-200">view</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Item -->
                    <tr v-for="(board, index) in BoardList" :key="index">
                        <td>
                            <a href="#" class="fw-bold">{{ board.boardId }}</a>
                        </td>
                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                            <nobr
                                ><span class="fw-normal">{{ board.title }}</span></nobr
                            >
                        </td>
                        <td>
                            <span class="fw-normal">{{ board.writer }}</span>
                        </td>
                        <td>
                            <span class="fw-normal">{{ board.regDt }}</span>
                        </td>
                        <td>
                            <span class="fw-bold">{{ board.readCount }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                <nav aria-label="Page navigation example">
                    <ul class="pagination mb-0">
                        <li class="page-item">
                            <a class="page-link" href="#">Previous</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">4</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">5</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            BoardList: [],
        };
    },
    methods: {
        freeBoard() {
            this.BoardList = [
                {
                    boardId: "1",
                    // title: "1번 제목",
                    title: "1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목1번 제목",
                    writer: "1번 작성자",
                    regDt: "2022-05-20",
                    readCount: "1",
                },
                {
                    boardId: "2",
                    title: "2번 제목",
                    writer: "2번 작성자",
                    regDt: "2022-05-20",
                    readCount: "2",
                },
                {
                    boardId: "3",
                    title: "3번 제목",
                    writer: "3번 작성자",
                    regDt: "2022-05-20",
                    readCount: "3",
                },
                {
                    boardId: "4",
                    title: "4번 제목",
                    writer: "4번 작성자",
                    regDt: "2022-05-20",
                    readCount: "4",
                },
                {
                    boardId: "5",
                    title: "5번 제목",
                    writer: "5번 작성자",
                    regDt: "2022-05-20",
                    readCount: "5",
                },
                {
                    boardId: "6",
                    title: "6번 제목",
                    writer: "6번 작성자",
                    regDt: "2022-05-20",
                    readCount: "6",
                },
                {
                    boardId: "7",
                    title: "7번 제목",
                    writer: "7번 작성자",
                    regDt: "2022-05-20",
                    readCount: "7",
                },
                {
                    boardId: "8",
                    title: "8번 제목",
                    writer: "8번 작성자",
                    regDt: "2022-05-20",
                    readCount: "8",
                },
                {
                    boardId: "9",
                    title: "9번 제목",
                    writer: "9번 작성자",
                    regDt: "2022-05-20",
                    readCount: "9",
                },
                {
                    boardId: "10",
                    title: "10번 제목",
                    writer: "10번 작성자",
                    regDt: "2022-05-20",
                    readCount: "10",
                },
            ];
        },
        qnaBoard() {
            this.BoardList = [
                {
                    boardId: "1",
                    title: "QnA 1번 제목",
                    writer: "1번 작성자",
                    regDt: "2022-05-20",
                    readCount: "1",
                },
                {
                    boardId: "2",
                    title: "2번 제목",
                    writer: "2번 작성자",
                    regDt: "2022-05-20",
                    readCount: "2",
                },
                {
                    boardId: "3",
                    title: "3번 제목",
                    writer: "3번 작성자",
                    regDt: "2022-05-20",
                    readCount: "3",
                },
                {
                    boardId: "4",
                    title: "4번 제목",
                    writer: "4번 작성자",
                    regDt: "2022-05-20",
                    readCount: "4",
                },
                {
                    boardId: "5",
                    title: "5번 제목",
                    writer: "5번 작성자",
                    regDt: "2022-05-20",
                    readCount: "5",
                },
                {
                    boardId: "6",
                    title: "6번 제목",
                    writer: "6번 작성자",
                    regDt: "2022-05-20",
                    readCount: "6",
                },
                {
                    boardId: "7",
                    title: "7번 제목",
                    writer: "7번 작성자",
                    regDt: "2022-05-20",
                    readCount: "7",
                },
                {
                    boardId: "8",
                    title: "8번 제목",
                    writer: "8번 작성자",
                    regDt: "2022-05-20",
                    readCount: "8",
                },
                {
                    boardId: "9",
                    title: "9번 제목",
                    writer: "9번 작성자",
                    regDt: "2022-05-20",
                    readCount: "9",
                },
                {
                    boardId: "10",
                    title: "10번 제목",
                    writer: "10번 작성자",
                    regDt: "2022-05-20",
                    readCount: "10",
                },
            ];
        },
        noticeBoard() {
            this.BoardList = [
                {
                    boardId: "1",
                    title: "공지사항 1번 제목",
                    writer: "1번 작성자",
                    regDt: "2022-05-20",
                    readCount: "1",
                },
                {
                    boardId: "2",
                    title: "2번 제목",
                    writer: "2번 작성자",
                    regDt: "2022-05-20",
                    readCount: "2",
                },
                {
                    boardId: "3",
                    title: "3번 제목",
                    writer: "3번 작성자",
                    regDt: "2022-05-20",
                    readCount: "3",
                },
                {
                    boardId: "4",
                    title: "4번 제목",
                    writer: "4번 작성자",
                    regDt: "2022-05-20",
                    readCount: "4",
                },
                {
                    boardId: "5",
                    title: "5번 제목",
                    writer: "5번 작성자",
                    regDt: "2022-05-20",
                    readCount: "5",
                },
                {
                    boardId: "6",
                    title: "6번 제목",
                    writer: "6번 작성자",
                    regDt: "2022-05-20",
                    readCount: "6",
                },
                {
                    boardId: "7",
                    title: "7번 제목",
                    writer: "7번 작성자",
                    regDt: "2022-05-20",
                    readCount: "7",
                },
                {
                    boardId: "8",
                    title: "8번 제목",
                    writer: "8번 작성자",
                    regDt: "2022-05-20",
                    readCount: "8",
                },
                {
                    boardId: "9",
                    title: "9번 제목",
                    writer: "9번 작성자",
                    regDt: "2022-05-20",
                    readCount: "9",
                },
                {
                    boardId: "10",
                    title: "10번 제목",
                    writer: "10번 작성자",
                    regDt: "2022-05-20",
                    readCount: "10",
                },
            ];
        },
    },
    created() {
        this.freeBoard();
    },
};
</script>

<style></style>
