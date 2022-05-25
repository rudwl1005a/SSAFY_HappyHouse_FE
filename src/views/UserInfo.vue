<template>
    <div :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }" style="margin: 20px 20px 20px 0">
        <div class="row">
            <div class="col-12 col-xl-4">
                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="card shadow border-0 text-center p-0">
                            <div class="profile-cover rounded-top" data-background="../assets/img/profile-cover.jpg"></div>
                            <div class="card-body pb-5">
                                <img src="../assets/img/team/profile-picture-1.jpg" class="avatar-xl rounded-circle mx-auto mt-n7 mb-4" alt="Neil Portrait" />
                                <h4 class="h3">{{ $store.state.userInfo.name }}</h4>
                                <h5 class="fw-normal">Junior Web BackEnd Engineer</h5>
                                <button class="btn btn-sm btn-info d-inline-flex align-items-center me-2">
                                    <font-awesome-icon icon="fa-solid fa-user-pen" style="margin-right: 5px" />
                                    회원 수정
                                </button>
                                <button class="btn btn-sm btn-danger d-inline-flex align-items-center me-2">
                                    <font-awesome-icon icon="fa-solid fa-user-large-slash" style="margin-right: 5px" />
                                    회원 탈퇴
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-8">
                <div class="card card-body border-0 shadow mb-4">
                    <h2 class="h5 mb-4">User information</h2>
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div>
                                    <label for="first_name">First Name</label>
                                    <input class="form-control" id="first_name" type="text" placeholder="Enter your first name" required />
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div>
                                    <label for="last_name">Last Name</label>
                                    <input class="form-control" id="last_name" type="text" placeholder="Also your last name" required />
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-md-6 mb-3">
                                <label for="birthday">Birthday</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <svg class="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                    <input data-datepicker="" class="form-control" id="birthday" type="text" placeholder="dd/mm/yyyy" required />
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="gender">Gender</label>
                                <select class="form-select mb-0" id="gender" aria-label="Gender select example">
                                    <option selected>Gender</option>
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" id="email" type="email" placeholder="name@company.com" required />
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input class="form-control" id="phone" type="number" placeholder="+12-345 678 910" required />
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-gray-800 mt-3 animate-up-2" type="submit">Save all</button>
                        <!-- <button class="btn btn-gray-800 mt-3 animate-up-2" type="submit" style="display: inline-block; float: right;">Save all</button> -->
                    </form>
                </div>
            </div>
            <div class="card card-body border-0 shadow table-wrapper table-responsive" style="margin: 0 10px 0 10px">
                <h3 style="text-align: center">내가 쓴 게시물</h3>
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
                <div class="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-md-center" style="text-align: center; padding-bottom: 0px">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination mb-0">
                            <li class="page-item">
                                <a class="page-link" href="#">Prev</a>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            BoardList: [
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
                    boardId: "5",
                    title: "5번 제목",
                    writer: "5번 작성자",
                    regDt: "2022-05-20",
                    readCount: "5",
                },
            ],
        };
    },
};
</script>

<style></style>
